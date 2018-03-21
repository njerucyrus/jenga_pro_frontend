<template>
  <div>
    <jenga-pro-login-header></jenga-pro-login-header>
    <div class="container" style="margin-top: 50px; margin-bottom: 50px;">
      <flash-message></flash-message>
      <div class="row" style="background: transparent">
        <div class="col-lg-8 col-md-8 col-xs-8 col-md-push-2">
          <div class="panel panel-info">
            <h6 class="panel-heading" style="margin-top:0px;">Login Here</h6>
            <div class="panel-body">
              <form class="form-group">
                <div class="form-group">
                  <label for="username" class="sr-only">Username</label>
                    <input type="text" id="username" class="form-control"  placeholder="Enter Username">

                </div>
                <div class="form-group">
                  <label for="password" class="sr-only">Username</label>
                  <input type="password" id="password" class="form-control" placeholder="Enter Your Password">
                </div>
                <div>
                  <button class="btn btn-default pull-left">Login</button>
                  <span class="pull-right"><a href="#">Forgot Password</a></span>
                </div>
              </form>
            </div>
            <div class="row">
              <div class="container-fluid">
                <div class="panel-footer">
                  <router-link :to="{name: 'Register'}">
                  <a href="#"> Don't have an account ?</a>
                  </router-link>
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
    components: {
      JengaProLoginHeader,
    },
    name: "JengaProLogin",


  }
</script>
