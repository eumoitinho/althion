// =====================================================
// Azure App Service Module (Container-based)
// =====================================================

@description('The name of the App Service')
param name string

@description('The Azure region for the resource')
param location string

@description('The App Service Plan resource ID')
param appServicePlanId string

@description('The Container Registry name')
param containerRegistryName string

@description('The Container Registry login server')
param containerRegistryLoginServer string

@description('The Docker image name')
param imageName string

@description('The Docker image tag')
param imageTag string = 'latest'

@description('The port the container listens on')
param port int = 3000

@description('App settings (environment variables)')
param appSettings array = []

resource containerRegistry 'Microsoft.ContainerRegistry/registries@2023-07-01' existing = {
  name: containerRegistryName
}

resource appService 'Microsoft.Web/sites@2023-01-01' = {
  name: name
  location: location
  kind: 'app,linux,container'
  properties: {
    serverFarmId: appServicePlanId
    siteConfig: {
      linuxFxVersion: 'DOCKER|${containerRegistryLoginServer}/${imageName}:${imageTag}'
      appSettings: concat([
        {
          name: 'WEBSITES_PORT'
          value: string(port)
        }
        {
          name: 'DOCKER_REGISTRY_SERVER_URL'
          value: 'https://${containerRegistryLoginServer}'
        }
        {
          name: 'DOCKER_REGISTRY_SERVER_USERNAME'
          value: containerRegistry.listCredentials().username
        }
        {
          name: 'DOCKER_REGISTRY_SERVER_PASSWORD'
          value: containerRegistry.listCredentials().passwords[0].value
        }
        {
          name: 'WEBSITES_ENABLE_APP_SERVICE_STORAGE'
          value: 'false'
        }
      ], appSettings)
      alwaysOn: true
      http20Enabled: true
      ftpsState: 'Disabled'
      minTlsVersion: '1.2'
    }
    httpsOnly: true
  }
}

output id string = appService.id
output name string = appService.name
output defaultHostName string = appService.properties.defaultHostName
