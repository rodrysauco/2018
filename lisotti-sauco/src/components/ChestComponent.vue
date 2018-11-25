<template>
    <div class="container container--shadow" v-if="chest._id">
        <section class="chest__return">
            <el-button type="text" @click="goBack" class="returnBtn">
                <i class="el-icon-caret-left"></i>Go Back
            </el-button>
        </section>
        <section class="chest__header">
            <div class="chest__image">
                <img :src="'http://www.clashapi.xyz/images/chests/'+chest.url+'.png'" :alt="chest.name+' image'">
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
                chest: Object,
            }
        },
        beforeMount() {
            let route = this.$route.path.split("/");
            apiService.getChest(route[2])
                .then(data => {
                    this.chest = data.data;
                    this.chest = apiService.translateImageUrl(this.chest);
                })
                .catch(err => console.log(err))

        },
        methods: {
            goBack() {
                router.push({
                    name: 'chests'
                })
            }
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

    .chest__info {
        /*display: inline-block;*/
        vertical-align: top;
        padding: 25px 0 0 5px;
    }

    .chest__title {
        font-size: 36px;
    }

    .chest__subtitle {
        font-size: 18px;
        font-style: italic;
        width: 50%
    }

    .chest__subtitle2 {
        font-size: 18px;
        font-style: italic;
        float: right;
    }
</style>