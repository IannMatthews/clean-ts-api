import { Collection, MongoClient, MongoClientOptions } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,

  async connect (url: string): Promise<void> {
    const options: MongoClientOptions = {
      // useNewUrlParser: true,
      // useUnifiedTopology: true
    }
    this.client = await MongoClient.connect(process.env.MONGO_URL, options)
  },

  async disconnect (): Promise<void> {
    this.client.close()
  },

  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  },

  map (collection: any): any {
    const { _id, ...collectionWithoutId } = collection
    return Object.assign({}, collectionWithoutId, { id: _id })
  }
}