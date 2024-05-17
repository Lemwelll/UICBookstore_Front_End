<template>
  <div class="background-image">
    <div class="pageCont">
      <div class="imageCont">
        <img src="./logo1.png" alt="Image 1" class="image1">
        <img src="./logo2.png" alt="Image 2" class="image2">
      </div>
      <div class="formsCont">
        <div class="header">UIC Bookstore</div>
        <div class="header">Online Reservation</div>
        <div class="header">Online System</div>
        <div>
          <button @click="useRouter().push({ name: 'login' })" class="custom-btn1">
            Sign In
          </button>
        </div>
        <button @click="useRouter().push({ name: 'sign-up' })" class="custom-btn2">
          Sign Up
        </button>
      </div>
  </div>
  </div>
</template>

<script setup>
  definePageMeta({
    layout: "plain",
  });

</script>

<style>
  .background-image {
    margin: 0;
    background-image: url('./uicBuilding.jpg');
    background-size: cover;
    background-position: center;
    min-height: 100vh;
  }

  .pageCont {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .formsCont {
    background:  rgba(255, 192, 203, 0.7);
    width: 30rem;
    text-align: center;
    margin: 0 auto; /* Center the element horizontally */
    padding: 2rem;
    border-radius: 1rem;
  }


  .header {
    color: white;
    font-weight: bolder;
    font-size: 2rem;
  }

  .custom-btn1 {
    background:  rgba(255, 192, 203, 0.7);
    margin-bottom: 1rem;
    font-size: 1.1rem;
    padding: .5rem;
    width: 20rem;
    font-weight: bolder;
    margin-top:5rem;
    border-radius: 1rem;
  }

  .custom-btn1:hover {
    background:  rgba(255, 192, 203, 1);
  }

  .custom-btn2 {
    background:  rgba(255, 129, 150);
    margin-bottom: 1rem;
    font-size: 1.1rem;
    padding: .5rem;
    color: white;
    font-weight: bolder;
    width: 20rem;
    border-radius: 1rem;
  }

  .custom-btn2:hover {
    background:  rgb(247, 88, 114);
  }

  .image1 {
    width: 10rem;
  }

  .image2 {
    width: 10rem;
  }

  .imageCont {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>