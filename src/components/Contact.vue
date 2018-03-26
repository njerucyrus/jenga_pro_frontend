<template>

  <section id="contact">
    <jenga-pro-login-header></jenga-pro-login-header>
    <div class="container container-fluid">
      <div>
        <h3 class="panel-heading"><strong>Contact Us</strong></h3>
      </div>

      <div class="row">
        <div class="col-md-6" style="background-color: white;margin: 5px; padding: 5px">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d287.9660968222888!2d36.82111375889261!3d-1.2836857500261671!2m3!1f0!2f39.01603715550872!3f0!3m2!1i1024!2i768!4f35!3m3!1m2!1s0x182f10d4ff33ee35%3A0x2c74859636685b55!2sNairobi+Central%2C+Nairobi!5e1!3m2!1sen!2ske!4v1522039682684"
            width="100%" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>
        </div>

        <div class="col-md-5">

          <h4 class="panel-heading" v-if="!loading"><strong>Get in Touch</strong></h4>
          <h3 v-if="loading" class="panel-heading">Sending...</h3>
          <div v-if="loading" class="loader"></div>
          <form v-if="!loading">
            <flash-message></flash-message>
            <div class="form-group">
              <input type="text" class="form-control" v-model="fullName" placeholder="Name">
            </div>
            <div class="form-group">
              <input type="email" class="form-control" v-model="email" value="" placeholder="E-mail">
            </div>
            <div class="form-group">
              <input type="tel" class="form-control" v-model="phoneNumber" value="" placeholder="Phone">
            </div>
            <div class="form-group">
              <textarea class="form-control" v-model="message" rows="3" placeholder="Message"></textarea>
            </div>
          </form>
          <button v-if="!loading" class="btn btn-default" @click.prevent="sendMessage">
            <i class="fa fa-paper-plane-o" aria-hidden="true"></i>
            Submit
          </button>
        </div>
      </div>
      <div class="row">
        <div class="container">

          <div class="row text-center">
            <div class="col-sm-3 col-xs-6 first-box">
              <h1><i class="fa fa-mobile" aria-hidden="true"></i></h1>
              <h3>Phone</h3>
              <p>+254723862137</p><br>
            </div>
            <div class="col-sm-3 col-xs-6 second-box">
              <h1><i class="fa fa-home"></i></h1>
              <h3>Location</h3>
              <p>Thika Road</p><br>
            </div>
            <div class="col-sm-3 col-xs-6 third-box">
              <h1><i class="fa fa-send"></i></h1>
              <h3>E-mail</h3>
              <p>info@jengapro.com</p><br>
            </div>
            <div class="col-sm-3 col-xs-6 fourth-box">
              <h1><i class="fa fa-globe"></i></h1>
              <h3>Web</h3>
              <p class="link">www.jengapro.com</p><br>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import JengaProLoginHeader from "./LoginHeader";
  import axios from 'axios'
  import api from '../store/api'

  export default {
    components: {
      JengaProLoginHeader,
    },
    name: "JengaProContact",
    data() {
      return {
        fullName: '',
        email: '',
        phoneNumber: '',
        message: '',
        sent: false,
        loading:false,
        errors: []
      }
    },
    methods: {
      sendMessage() {
        const payload = {
          name: this.fullName,
          email: this.email,
          phone_number: this.phoneNumber,
          message: this.message
        };

        this.loading=true;

        api.post(`/contactus/`, payload)
          .then(response => {
            if (response.status === 201) {
              this.sent = true;
              this.loading = false;
              const vm = this
              let message = 'Thank you for contacting JengaPro we have received your message and will' +
                ' contact you for feedback';
              this.flash(message, 'success', {
                timeout: 3000,
                important: true
              });

              setTimeout(function () {
                vm.resetForm()
              }, 3000)
            } else {
              console.log(error)
              let message = 'Oops! something bad happened message not sent please try again'
              this.flash(message, 'error', {
                timeout: 3000,
                important: true
              });
            }
          })
          .catch(error => {
            this.loading = false;
            console.log(error);
            let message = 'Oops! something bad happened message not sent please try again'
            this.flash(message, 'error', {
              timeout: 3000,
              important: true,
            });


          })
      },
      resetForm() {
        this.fullName = '';
        this.email = '';
        this.message = '';
        this.phoneNumber = '';
        this.sent = false;

      }
    }
  }

</script>

<style scoped>
  /*Google font integration*/
  @import url('https://fonts.googleapis.com/css?family=Roboto');

  #contact {
    background-color: #f1f1f1;
    font-family: 'Roboto', sans-serif;
  }

  #contact .well {
    margin-top: 30px;
    border-radius: 0;
  }

  #contact .form-control {
    border-radius: 0;
    border: 2px solid #1e1e1e;
  }

  #contact button {
    border-radius: 0;
    border: 2px solid #1e1e1e;
  }

  #contact .row {
    margin-bottom: 30px;
  }

  @media (max-width: 768px) {
    #contact iframe {
      margin-bottom: 15px;
    }

  }

  .first-box {
    padding: 10px;
  }

  .second-box {
    padding: 10px;
  }

  .third-box {
    padding: 10px;
  }

  .fourth-box {
    padding: 10px;
  }
</style>
