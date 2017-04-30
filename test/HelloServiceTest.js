var carbon = require('carbon-io')
var __     = carbon.fibers.__(module)
var _o     = carbon.bond._o(module)
var o      = carbon.atom.o(module).main // Note the .main here since this is the main (test) application

/***************************************************************************************************
 * HelloServiceTest
 */
__(function() {
  module.exports = o({

    /***************************************************************************
     * _type
     */
    _type: carbon.carbond.test.ServiceTest,

    /***************************************************************************
     * name
     */
    name: "HelloServiceTest",

    /***************************************************************************
     * service
     */
    service: _o('../lib/PublicHelloService'),

    /***************************************************************************
     * privateService
     */
    privateService: _o('../lib/PrivateHelloService'),

    /***************************************************************************
     * setup
     */
    setup: function() {
      carbon.carbond.test.ServiceTest.prototype.setup.call(this)
      
      // Start private service
      this.privateService.verbosity = 'fatal'
      this.privateService.start()
    },

    /***************************************************************************
     * teardown
     */
    teardown: function() {
      // Stop private service
      this.privateService.stop()
      
      carbon.carbond.test.ServiceTest.prototype.teardown.call(this)
    },
    
    /***************************************************************************
     * tests
     */
    tests: [
      // Test GET
      {
        reqSpec: {
          url: '/hello',
          method: "GET"
        },
        resSpec: {
          statusCode: 200,
          body: { msg: "Hello world!" }
        }
      },
    ]

  })
})
