// =====================================================
// Azure Cache for Redis Module
// =====================================================

@description('The name of the Redis cache')
param name string

@description('The Azure region for the resource')
param location string

@description('The SKU name for the cache')
@allowed(['Basic', 'Standard', 'Premium'])
param skuName string = 'Basic'

@description('The cache capacity (0-6 for Basic/Standard, 1-5 for Premium)')
param capacity int = 0

resource redisCache 'Microsoft.Cache/redis@2023-08-01' = {
  name: name
  location: location
  properties: {
    sku: {
      name: skuName
      family: skuName == 'Premium' ? 'P' : 'C'
      capacity: capacity
    }
    enableNonSslPort: false
    minimumTlsVersion: '1.2'
    publicNetworkAccess: 'Enabled'
    redisConfiguration: {
      'maxmemory-policy': 'volatile-lru'
    }
  }
}

output id string = redisCache.id
output name string = redisCache.name
output hostName string = redisCache.properties.hostName
output sslPort int = redisCache.properties.sslPort
output primaryKey string = redisCache.listKeys().primaryKey
