<template>
  <div class="modal-backdrop" @click="handleBackdropClick" ref="backdrop">
    <div class="modal">
        <header class="modal-header">
            <slot name="header">
            {{ joke.category }}
            </slot>
            <a href="javascript:" class="favourite-btn" @click="addFavoriteJoke(joke)">
                <span v-bind:class=" (joke.isFavorite == true) ? 'fa-heart': 'fa-heart-o'" class="fa"></span>
            </a>    
            <button type="button" class="btn-close" @click="close">
            x
            </button>
        </header>
        <section class="modal-body">
            <slot name="body">
                <div v-if="joke.type === 'single'">
                {{ joke.joke }}
                </div>
                <div v-if="joke.type === 'twopart'">
                    {{ joke.setup }} <br />
                    <a v-if="!showMoreData" class="showMore" @click="showMore()">Show More..</a>
                    <div class="jokeDelivery" v-if="showMoreData">
                        <b>{{ joke.delivery }}</b><br />
                    </div>
                </div>
            </slot>
       </section>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'JokeDetailsModal',
    props: {
        joke: {
            type: Object,
        },
    },
     data () {
        return {
            showMoreData: false,
            idStore: false
        }
    },
    methods: {
        close() {
            this.$emit('close');
            this.showMoreData = false;
        },
        addFavoriteJoke(event){
            event.isFavorite = !event.isFavorite;            
        },
        handleBackdropClick(e){
            if (e.target.className == "modal-backdrop") {
                this.close();
            }            
        },
        showMore(){
            this.showMoreData = true;           
        }
    }
  };
</script>

<style>
  .modal-backdrop {
    position: fixed;
    font-size:20px;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    position: relative;
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    flex-direction: column;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }

  .jokeDelivery{
    font-size: 20px;
    padding: 10px 0;
  }

  .favourite-btn{
    margin-right: 30px;
  }

  .favourite-btn span{
    color: #4AAE9B;
  }  

  .modal-fade-enter,
  .modal-fade-leave-to {
    opacity: 0;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease;
  }
  .showMore{
    color:blue;
    font-size: 18px;
    cursor: pointer;
    text-decoration: underline;
  }
</style>