// =====================================================
// Althion Lab - Azure Infrastructure
// Main Bicep Template
// =====================================================

@description('The environment name (dev, staging, prod)')
@allowed(['dev', 'staging', 'prod'])
param environment string = 'prod'

@description('The Azure region for resources')
param location string = resourceGroup().location

@description('The project name used for naming resources')
param projectName string = 'althion'

@description('PostgreSQL administrator login')
param postgresAdminLogin string = 'medusa_admin'

@description('PostgreSQL administrator password')
@secure()
param postgresAdminPassword string

@description('JWT Secret for Medusa')
@secure()
param jwtSecret string

@description('Cookie Secret for Medusa')
@secure()
param cookieSecret string

@description('Sanity Project ID')
param sanityProjectId string = 'towmhciw'

@description('Sanity Dataset')
param sanityDataset string = 'production'

@description('Sanity API Token')
@secure()
param sanityApiToken string

// =====================================================
// Variables
// =====================================================
var uniqueSuffix = uniqueString(resourceGroup().id)
var resourcePrefix = '${projectName}-${environment}'

// =====================================================
// Container Registry
// =====================================================
module containerRegistry 'modules/container-registry.bicep' = {
  name: 'containerRegistry'
  params: {
    name: replace('${resourcePrefix}acr${uniqueSuffix}', '-', '')
    location: location
    sku: environment == 'prod' ? 'Standard' : 'Basic'
  }
}

// =====================================================
// PostgreSQL Flexible Server
// =====================================================
module postgresql 'modules/postgresql.bicep' = {
  name: 'postgresql'
  params: {
    name: '${resourcePrefix}-postgres-${uniqueSuffix}'
    location: location
    administratorLogin: postgresAdminLogin
    administratorPassword: postgresAdminPassword
    databaseName: 'medusa_db'
    skuName: environment == 'prod' ? 'Standard_B2s' : 'Standard_B1ms'
    storageSizeGB: environment == 'prod' ? 64 : 32
  }
}

// =====================================================
// Redis Cache
// =====================================================
module redis 'modules/redis.bicep' = {
  name: 'redis'
  params: {
    name: '${resourcePrefix}-redis-${uniqueSuffix}'
    location: location
    skuName: environment == 'prod' ? 'Standard' : 'Basic'
    capacity: environment == 'prod' ? 1 : 0
  }
}

// =====================================================
// App Service Plan (shared by both apps)
// =====================================================
module appServicePlan 'modules/app-service-plan.bicep' = {
  name: 'appServicePlan'
  params: {
    name: '${resourcePrefix}-plan'
    location: location
    skuName: environment == 'prod' ? 'P1v3' : 'B1'
    skuTier: environment == 'prod' ? 'PremiumV3' : 'Basic'
  }
}

// =====================================================
// Backend App Service (Medusa)
// =====================================================
module backendApp 'modules/app-service.bicep' = {
  name: 'backendApp'
  params: {
    name: '${resourcePrefix}-backend'
    location: location
    appServicePlanId: appServicePlan.outputs.id
    containerRegistryName: containerRegistry.outputs.name
    containerRegistryLoginServer: containerRegistry.outputs.loginServer
    imageName: 'althion-backend'
    imageTag: 'latest'
    port: 9000
    appSettings: [
      { name: 'NODE_ENV', value: 'production' }
      { name: 'PORT', value: '9000' }
      { name: 'DATABASE_URL', value: 'postgres://${postgresAdminLogin}:${postgresAdminPassword}@${postgresql.outputs.fqdn}:5432/medusa_db?sslmode=require' }
      { name: 'REDIS_URL', value: 'rediss://:${redis.outputs.primaryKey}@${redis.outputs.hostName}:6380' }
      { name: 'JWT_SECRET', value: jwtSecret }
      { name: 'COOKIE_SECRET', value: cookieSecret }
      { name: 'STORE_CORS', value: 'https://${resourcePrefix}-frontend.azurewebsites.net' }
      { name: 'ADMIN_CORS', value: 'https://${resourcePrefix}-frontend.azurewebsites.net' }
    ]
  }
  dependsOn: [
    postgresql
    redis
  ]
}

// =====================================================
// Frontend App Service (Next.js)
// =====================================================
module frontendApp 'modules/app-service.bicep' = {
  name: 'frontendApp'
  params: {
    name: '${resourcePrefix}-frontend'
    location: location
    appServicePlanId: appServicePlan.outputs.id
    containerRegistryName: containerRegistry.outputs.name
    containerRegistryLoginServer: containerRegistry.outputs.loginServer
    imageName: 'althion-frontend'
    imageTag: 'latest'
    port: 3000
    appSettings: [
      { name: 'NODE_ENV', value: 'production' }
      { name: 'NEXT_PUBLIC_SANITY_PROJECT_ID', value: sanityProjectId }
      { name: 'NEXT_PUBLIC_SANITY_DATASET', value: sanityDataset }
      { name: 'SANITY_API_TOKEN', value: sanityApiToken }
      { name: 'NEXT_PUBLIC_MEDUSA_BACKEND_URL', value: 'https://${resourcePrefix}-backend.azurewebsites.net' }
    ]
  }
}

// =====================================================
// Outputs
// =====================================================
output containerRegistryLoginServer string = containerRegistry.outputs.loginServer
output containerRegistryName string = containerRegistry.outputs.name
output postgresqlFqdn string = postgresql.outputs.fqdn
output redisHostName string = redis.outputs.hostName
output backendUrl string = 'https://${backendApp.outputs.defaultHostName}'
output frontendUrl string = 'https://${frontendApp.outputs.defaultHostName}'
