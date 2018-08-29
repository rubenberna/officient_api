<template >
    <div v-if="loading">
      <scale-loader :loading="loading"
                    :color="color"
                    :height="height"
                    :width="width" />
    </div>
</template>

<script>
import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue';

export default {
    props: {
      loading: Boolean,
      color: String,
      height: String,
      width: String
    },
    components: {
     ScaleLoader
    }
}
</script>
