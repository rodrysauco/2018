<template>
    <div class="container container--shadow" v-if="chest._id">
        <section class="chest__return">
            <el-button type="text" @click="goBack" class="returnBtn">
                <i class="el-icon-caret-left"></i>Go Back
            </el-button>
        </section>
        <section class="chest__header">
            <div class="chest__image">
                <img
                    v-if="chest.name === 'Season Reward Chest'"
                    src="./../media/chest.png"
                    :alt="chest.name+' image'"
                >
                <img
                    v-else
                    :src="'http://www.clashapi.xyz/images/chests/'+chest.url+'.png'"
                    :alt="chest.name+' image'"
                >
            </div>
            <div class="chest__info">
                <span class="chest__title">{{chest.name}}</span>
                <el-row>
                    <el-col :span="12">
                        <div class="chest__subtitle">
                            <p>Arena: {{chest.arena}}</p>
                            <p>Gold min: {{chest.gold.min}}</p>
                            <p>Gold max: {{chest.gold.max}}</p>
                            <p>Description: {{chest.description}}</p>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <el-col :span="4" class="chest__subtitle">
                            <p>Cards:</p>
                        </el-col>
                        <el-col :span="20" class="chest__subtitle">
                            <p>Min epic: {{chest.cards.minEpic}}</p>
                            <p>Min legendary: {{chest.cards.minLegendary}}</p>
                            <p>Min rare: {{chest.cards.minRare}}</p>
                            <p>Number: {{chest.cards.number}}</p>
                        </el-col>
                    </el-col>
                </el-row>
            </div>
        </section>
    </div>
</template>
<script>
import apiService from '@/services/apiService';
import router from './../router';
export default {
    name: 'chest-component',
    data() {
        return {
            loading: Object,
            chest: Object,
        }
    },
    beforeMount() {
        this.loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
        });
        let route = this.$route.path.split("/");
        apiService.getChest(route[2])
            .then(data => this.fetchData(data.data))
            .catch(err => this.handleError(err.response))

    },
    methods: {
        goBack() {
            router.go(-1);
        },
        fetchData(data) {
            this.chest = data;
            this.chest = apiService.translateImageUrl(this.chest);
            this.loading.close()
        },
        handleError(error) {
            this.loading.close();
            this.$notify.error({
                title: error.status,
                message: error.statusText
            });
        },
    }
}

</script>
<style>
.container--shadow {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.chest__return {
  padding-left: 10px;
  border-bottom: 1px solid #8080802e;
}

.returnBtn {
  transition: font-size 1s;
}

.returnBtn:hover {
  font-size: 15px;
}

.chest__header {
  padding-left: 5px;
  padding-top: 5px;
}

.chest__image {
  width: 100%;
  max-width: 200px;
  margin-top: 20px;
  margin-right: auto;
  margin-left: auto;
}
.chest__image img {
  width: 100%;
}
.chest__info {
  vertical-align: top;
  padding: 25px 0 0 5px;
}

.chest__title {
  font-size: 36px;
}

.chest__subtitle {
  font-size: 18px;
  font-style: italic;
  width: 50%;
}

.chest__subtitle2 {
  font-size: 18px;
  font-style: italic;
  float: right;
}
</style>