import React from 'react'

const Register = () => {
  return (
    <div class="col-lg-5 mb-5">
    <div class="contact-form">
         
        <h1>Register</h1>
        
            <div class="control-group">
                <input type="text" class="form-control"  placeholder="Your Name"
                    required="required"  />
                <p class="help-block text-danger"></p>
            </div>
            <div class="control-group">
                <input type="email" class="form-control"  placeholder="Your Email"
                    required="required"   />
                <p class="help-block text-danger"></p>
            </div>
            <div class="control-group">
                <input type="text" class="form-control"   placeholder="Password"
                    required="required"  />
                <p class="help-block text-danger"></p>
            </div>
            <div class="control-group">
                <input type="text" class="form-control"   placeholder="Re-Password"
                    required="required"  />
                <p class="help-block text-danger"></p>
            </div>
            <div>
                <button class="btn btn-primary py-2 px-4" type="submit"  >Send
                    Message</button>
                    <p>Already have an account<a href='/login'>Login Here</a></p>
            </div>
      
    </div>
</div>
  )
}

export default Register