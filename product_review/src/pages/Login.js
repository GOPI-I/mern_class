export default function Login(){
  return(
      <>
      <div class="container-fluid pt-5">
      
      <div class="row px-xl-5">
          <div class="col-lg-5 mb-5">
              <div class="contact-form">
              <h1>Login</h1>
                  
                      <div class="control-group">
                          <input type="text" class="form-control"   placeholder="Your Email"
                              required="required"  />
                          <p class="help-block text-danger"></p>
                      </div>
                      <div class="control-group">
                          <input type="email" class="form-control"   placeholder="Your Password"
                              required="required"   />
                          <p class="help-block text-danger"></p>
                      </div>
                      
                      <div>
                          <button class="btn btn-primary py-2 px-4" type="submit"  >Send
                              Message</button>
                              <p>Don't Have account<a href="/register">Register Here</a></p>
                      </div>
           
              </div>
          </div>
          
        
      </div>
  </div>
      </>
  )
}