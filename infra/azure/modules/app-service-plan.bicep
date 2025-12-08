// =====================================================
// Azure App Service Plan Module
// =====================================================

@description('The name of the App Service Plan')
param name string

@description('The Azure region for the resource')
param location string

@description('The SKU name')
param skuName string = 'B1'

@description('The SKU tier')
param skuTier string = 'Basic'

resource appServicePlan 'Microsoft.Web/serverfarms@2023-01-01' = {
  name: name
  location: location
  kind: 'linux'
  sku: {
    name: skuName
    tier: skuTier
  }
  properties: {
    reserved: true // Required for Linux
  }
}

output id string = appServicePlan.id
output name string = appServicePlan.name
