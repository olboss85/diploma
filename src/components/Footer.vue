
<script setup>

const openWhatsApp  = () => {
  const phoneNumber = "+77714141416";
  const message = "Hello, how can we help you?";
  const url = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
};

const sendEmail = () => {
  window.location.href = "mailto:olboss85@gmail.com";
};

</script>

<template>

  <div class="footer">
    <h4>@ 2023</h4>
    <h4>All Rights Reserved © Travel Portal</h4>
    <div class="icons">
    <i class="pi pi-whatsapp" @click="openWhatsApp"></i>
    <i class="pi pi-envelope" @click="sendEmail"></i>
    </div>
  </div>
</template>

<style scoped>

.footer {
  color: #6c757d;
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: rgba(242, 120, 92, 0.70);
  padding: 10px;
  margin-top: auto;
}

.icons{
  display: flex;
  padding: 0px 10px;

}

  .footer h4 {
    margin: 5px;
  }

  .pi {
    cursor: pointer;
    font-size: 2rem; 
    padding: 0px 10px
  }
</style>