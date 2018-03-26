<template>
<div>
  <jenga-pro-login-header></jenga-pro-login-header>

  <div>
  <section class="container">
    <div class="col-lg-5 col-lg-offset-1">
      <h2 align="center">About us</h2>
      <p >JengaPro is a platform that enable users to buy building materials, mainly ballast, sand, building stones,
        metals, cement and timber. It also have a professional database that  categorize professional based on their specialty areas.
        This allows the customers to create an account through which they can order for specific services offered by the company; </p>
      <div>
        <h3>Our Vision</h3>
        <p>Revolutionize the construction Experience in Africa.</p>
        <h3>Our Mission</h3>
        <p>Our mission is to make it easy to do build anywhere in Africa.
          We do this by giving connecting clients to professional personnel, and by helping buyers find products and suppliers quickly and efficiently.</p>
      </div>
    </div>
    <div class="col-lg-offset-6">
      <img src="/static/images/building.jpg" class="img-responsive"/>
    </div>
    <div class="col-lg-5 col-lg-offset-1">
      <img src="/static/images/strategic-sourcing.jpg"/>
    </div>
    <div class="col-lg-6">
      <h3>One-Stop Sourcing</h3>
      <p>Jengapro brings you  products in different major categories, including cement, sand, building stones, and roofing materials.

        Also we enable you to source professional personnel in different areas such as Architect, Building Surveyor, Construction Managers,
        Project Engineers,Quantity Surveyor, Site Managers, Site Engineers, foremen ,e.t.c.
      </p>
    </div>
    <div class="col-md-12">
    <div class="col-lg-6 ">
      <h3>Anytime, Anywhere</h3>
      <p>As a platform, we continue to develop services to help businesses do more and discover new opportunities.

        Whether it’s sourcing from your mobile phone or contacting professional personnel, turn to Jengapro for all your construction needs.</p>
    </div>
    <div class="col-lg-6">
      <img src="/static/images/Anytime-Anywhere-Any-device.jpg" class="img-responsive"/>
    </div>
    </div>
  </section>
  </div>

</div>
</template>

<script>
    import JengaProLoginHeader from "./LoginHeader";

    export default {
      components: {
        JengaProLoginHeader,
        },
      name: "JengaProAbout"
    }
</script>

<style scoped>
  .container {
    width: 100%;

    background: #f1f1f1;
    margin: auto;
    padding: 10px;
  }
  .container2 {
    width: 100%;

    background: #FFFFFF;
    margin: auto;
    padding: 10px;
  }

</style>
