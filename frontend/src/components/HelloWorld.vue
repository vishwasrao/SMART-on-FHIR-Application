<template>
  <v-container>
    <v-responsive class="d-flex align-center text-left fill-height">
      <v-card class="mx-auto" variant="outlined">
        <template v-slot:title>
          auth-init
        </template>
        <v-card-text>
          <v-textarea :model-value="authInit" variant="outlined" rows="3" row-height="25" shaped></v-textarea>
        </v-card-text>
      </v-card>
      <v-divider></v-divider>
      <v-card class="mx-auto" variant="outlined">
        <template v-slot:title>
          auth-callback
        </template>
        <v-card-text>
          <v-textarea :model-value="authCallback" variant="outlined" rows="3" row-height="25" shaped></v-textarea>
        </v-card-text>
      </v-card>
    </v-responsive>
  </v-container>
</template>

<!-- script lang="ts" setup -->
<script >
import axios from 'axios';
export default {
  data() {
    return {
      authInit: {},
      authCallback: {},
    };
  },
  async mounted() {
    await this.getAuthFlowData();
    await this.getClinicalData();
  },
  methods: {
    async getAuthFlowData() {
      const self = this;
      console.log('Calling backend');
      try {
        const response = await axios.get('/auth/authFlowData', { withCredentials: true });
        console.log(JSON.stringify(response.data));
        self.authInit =JSON.stringify(response.data, null, 2);

      } catch (error) {
        console.error(error);
      }
    },

    async getClinicalData() {
      const self = this;
      try {
        const response = await axios.get('/clinical-data', { withCredentials: true });
        console.log(JSON.stringify(response.data));
        self.authInit =JSON.stringify(response.data, null, 2);

      } catch (error) {
        console.error(error);
      }
    },
  }
};
</script>
