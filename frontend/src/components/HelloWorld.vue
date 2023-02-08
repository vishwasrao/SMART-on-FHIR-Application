<template>
  <v-container>
    <v-responsive class="d-flex align-center text-left fill-height">
      <v-card class="mx-auto" variant="outlined">
        <template v-slot:title>
          authInit
        </template>
        <v-card-text>
          <v-textarea :model-value="authInit" variant="outlined" rows="4" row-height="25" shaped></v-textarea>
        </v-card-text>
      </v-card>
      <v-divider></v-divider>
      <v-card class="mx-auto" variant="outlined">
        <template v-slot:title>
          wellKnownConfig
        </template>
        <v-card-text>
          <v-textarea :model-value="wellKnownConfig" variant="outlined" rows="4" row-height="25" shaped></v-textarea>
        </v-card-text>
      </v-card>
      <v-divider></v-divider>
      <v-card class="mx-auto" variant="outlined">
        <template v-slot:title>
          callBackParams
        </template>
        <v-card-text>
          <v-textarea :model-value="callBackParams" variant="outlined" rows="4" row-height="25" shaped></v-textarea>
        </v-card-text>
      </v-card>
      <v-divider></v-divider>
      <v-card class="mx-auto" variant="outlined">
        <template v-slot:title>
          accessTokenResponse
        </template>
        <v-card-text>
          <v-textarea :model-value="accessTokenResponse" variant="outlined" rows="4" row-height="25" shaped></v-textarea>
        </v-card-text>
      </v-card>
      <v-divider></v-divider>
      <v-card class="mx-auto" variant="outlined">
        <template v-slot:title>
          clinicalData
        </template>
        <v-card-text>
          <v-textarea :model-value="clinicalData" variant="outlined" rows="4" row-height="25" shaped></v-textarea>
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
      authInit: null,
      wellKnownConfig: null,
      callBackParams: null,
      accessTokenResponse: null,
      clinicalData: null
    };
  },
  async mounted() {
    await this.getAuthFlowData();
    await this.getClinicalData();
  },
  methods: {
    async getAuthFlowData() {
      const self = this;
      try {
        const response = await axios.get('/auth/authFlowData', { withCredentials: true });
        self.authInit =JSON.stringify(response.data.authInit, null, 2);
        self.wellKnownConfig =JSON.stringify(response.data.wellKnownConfig, null, 2);
        self.callBackParams =JSON.stringify(response.data.callBackParams, null, 2);
        self.accessTokenResponse =JSON.stringify(response.data.accessTokenResponse, null, 2);
      } catch (error) {
        console.error(error);
      }
    },

    async getClinicalData() {
      const self = this;
      try {
        const response = await axios.get('/clinical-data', { withCredentials: true });
        self.clinicalData =JSON.stringify(response.data, null, 2);

      } catch (error) {
        console.error(error);
      }
    },
  }
};
</script>
