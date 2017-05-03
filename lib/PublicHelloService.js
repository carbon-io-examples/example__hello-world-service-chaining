var carbon = require('carbon-io')
var __     = carbon.fibers.__(module)
var _o     = carbon.bond._o(module)
var o      = carbon.atom.o(module).main // Note the .main here since this is the main application 

/***************************************************************************************************
 * PublicHelloService
 *
 * Hello-world example.
 */
__(function() {
  module.exports = o({

    /***************************************************************************
     * _type
     */
    _type: carbon.carbond.Service,

    /***************************************************************************
     * description
     */
    description: "Advanced hello-world service demonstrating microservice chaining",
    
    /***************************************************************************
     * port
     */
    port: 8888,

    /***************************************************************************
     * privateHelloService
     */
    privateHelloService: _o('http://localhost:9999'), 
    
    /***************************************************************************
     * endpoints
     */
    endpoints : {
      hello: o({
        _type: carbon.carbond.Endpoint,
        
        get: {
          responses: [
            {
              statusCode: 200,
              description: "Success",
              schema: {
                type: 'object',
                properties: {
                  msg: { type: 'string' }
                },
                required: [ 'msg' ],
                additionalProperties: false
              }
            }
          ],
          
          service: function(req, res) {
            return this.getService().privateHelloService.getEndpoint("hello").get().body
          }
        }

      })
    }

  })
})
