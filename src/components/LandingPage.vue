<template>
  <div style="margin-bottom: 25px;">
    <jenga-pro-login-header></jenga-pro-login-header>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12 flexslider">
          <div>
            <li style="list-style: none">
              <img src="/static/images/solid3.jpg" width="100%"/>
              <div class="row">
                <div class="container-fluid">
                  <div class="slide_text" style="text-align:center; margin-top: 0px; font-size: 12px!important;">
                    <!--<h6 class="slide_title" style="align-items: center;">Welcome to JengaPro<br>Select An option to get started-->
                    <!--</h6>-->
                    <div class="col-md-10 col-md-push-2">
                      <h6 class="slide_title">Welcome to JengaPro Platform <br/> Select an option to continue</h6>
                    </div>
                    <div class="col-md-10 col-md-push-2">
                      <router-link :to="{name: 'Products'}">
                        <a class="btn btn-primary" style="color: white!important;">Order Construction Materials</a>
                      </router-link>
                      <router-link :to="{name: 'Home'}">
                        <a class="btn btn-success" style="color: white!important;">Find Professional</a>
                      </router-link>
                      <router-link :to="{name: 'Home'}">
                        <a class="btn btn-danger" style="color: white!important;">Request a service</a>
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </li>

          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
  import JengaProLoginHeader from "./LoginHeader.vue";
  import Slider from "./Slider.vue";

  export default {
    components: {
      Slider,
      JengaProLoginHeader
    },
    name: 'JengaProLandingPage'
  }
</script>
