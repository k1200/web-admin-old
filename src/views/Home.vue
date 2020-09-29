<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
  </div>
</template>

<script>
// @ is an alias to /src
import { fn_api__test1, fn_api__test2 } from '@/api/login';

export default {
  name: 'Home',
  created() {
    // fn_api__test1();
    // fn_api__test2();
  }
};
</script>
