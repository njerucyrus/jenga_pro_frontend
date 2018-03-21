<template>
  <div>
    <jenga-pro-login-header></jenga-pro-login-header>
    <div class="container" style="margin-top: 50px; margin-bottom: 50px;">
      <div class="row">
        <div class="col-lg-8 col-md-8 col-xs-8 col-md-push-2">
          <div class="panel panel-info">
            <h6 class="panel-heading" style="margin-top:0px;">Register Here</h6>
            <div class="panel-body">
              <form>
                <div class="row">
                  <div class="col col-md-12">
                      <div class="col col-md-6">
                        <input type="text" class="form-control" placeholder="First Name"/>
                      </div>
                      <div class="col col-md-6">
                        <input type="text" class="form-control" placeholder="Last Name"/>
                      </div>
                  </div>
                </div>

                <div class="row" style="margin-top: 5px;">
                  <div class="col col-md-12">
                    <div class="col col-md-6">
                      <input type="text" class="form-control" placeholder="Email"/>
                    </div>
                    <div class="col col-md-6">
                      <input type="text" class="form-control" placeholder="Phone Number"/>
                    </div>
                  </div>
                </div>

                <div class="row" style="margin-top: 5px;">
                  <div class="col col-md-12">
                    <div class="col col-md-6">
                      <input type="password" class="form-control" placeholder="Password"/>
                    </div>
                    <div class="col col-md-6">
                      <input type="password" class="form-control" placeholder="Confirm Password"/>
                    </div>
                  </div>
                </div>
                <div class="row" style="margin-top: 5px;">
                  <div class="col col-md-12">
                    <div class="col-md-12">
                    <select class=" select-beast form-control">
                      <option>Customer</option>
                      <option>Foreman</option>
                    </select>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12">
                    <div class="col-md-12">
                      <button class="btn btn-default pull-left">Register</button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="row">
              <div class="container-fluid">
                <div class="panel-footer">
                  <a href="#"> Already have an account ?</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
  import JengaProLoginHeader from "./LoginHeader.vue";

  export default {
    components: {JengaProLoginHeader},
    name: "JengaProRegister",
  }
</script>
