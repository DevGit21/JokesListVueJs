<template>
  <div class="hello">
    <h1>Jokes</h1>
    <div class="headerCls">      
      <select v-model="selectedJokeType"  @change="onJokeTypeChange($event)">
          <option value="">Select Joke Type</option>
            <option v-for="type in jokeType" :value="type" :key="type">{{type}}</option>
        </select>   
        <button type="button" class="btn-green" @click="getJokesFromApi()">
          Fetch New Jokes
        </button> 
    </div>  
    <div class="jokeCount" v-if="jokesList" >
      Showing {{ visibleJokesCount }} jokes out of {{ jokesList.length }}
    </div>
    <ul>
      <template v-for="joke in jokesList">
      <li :key="joke.id" v-if="selectedJokeType === 'Any' ? true : joke.type === selectedJokeType" :class="setClass(joke.category,selectedJokeType,joke.isFavorite)">
          <span>{{joke.type === 'single' ? joke.joke.split(' ').slice(0, 3).join(' ').replace(/\/r/, '/') : joke.setup.split(' ').slice(0, 3).join(' ').replace(/\/r/, '/')}}...</span>
          <button type="button" class="btn-green" @click="showModal(joke)">
            >>
          </button>       
      </li>
      </template>
    </ul>
    <JokeDetailsModal v-if="jokeData" v-show="isModalVisible"  @close="closeModal" :joke="jokeData" />
  </div>  
</template>

<script>
import axios from 'axios'
import JokeDetailsModal from '@/components/JokeDetailsModal.vue';
export default {
  name: 'JokeList',
  components: {
      JokeDetailsModal
  },
  data () {
    return {
      jokesList: null,
      jokeData:null,
      loading: true,
      isModalVisible: false,
      jokeType: ['Any','single','twopart'],
      selected: '',
      selectedJokeType:'Any',
      visibleJokesCount:0,
      initialJokeList:null
    }
  },
  mounted () {
    this.getJokesFromApi();
  },  
  methods: {
      getJokesFromApi(){
          axios
        .get('https://v2.jokeapi.dev/joke/Programming,Pun,Misc,Spooky?safe-mode&amount=10')
        .then(response => { 
          response.data.jokes.map((item, index) => {
              item.isFavorite = false;
              return item;
          });

          if(this.jokesList){
            this.jokesList = this.jokesList.filter(function(joke){ return joke.isFavorite === true })
            this.jokesList = this.compareArray(response.data.jokes,this.jokesList);
          }
          else{
            this.jokesList = response.data.jokes;
          } 
          
          this.visibleJokesCount = this.jokesList.length; 
          this.selectedJokeType = "Any";         
        })
        .catch(error => {
          console.log(error)
          this.errored = true
        })
        .finally(() => this.loading = false)
      },
      showModal(joke) {
        this.isModalVisible = true;
        this.jokeData = joke;
      },
      closeModal() {
        this.isModalVisible = false;
      },
      onJokeTypeChange(event) {
          this.selectedJokeType = event.target.value;
          if(event.target.value === 'Any'){
            this.visibleJokesCount = this.jokesList.length;
          }
          else{            
            let filterJokes = this.jokesList.filter((joke) => joke.type === this.selectedJokeType);
            this.visibleJokesCount = filterJokes.length;
          }          
      },
      fetchNewJokes() {
        axios
        .get('https://v2.jokeapi.dev/joke/Programming,Pun,Misc,Spooky?safe-mode&amount=10')
        .then(response => {
          this.jokesList.push(...response.data.jokes);
          this.jokesList = this.removeDuplicatesObject(this.jokesList);
          this.visibleJokesCount = this.jokesList.length;
        })
        .catch(error => {
          console.log(error)
          this.errored = true
        })
        .finally(() => this.loading = false)
      },
      setClass(class1, class2, class3){
        return class1+" "+class2+" isFavorite"+class3;
      },
      compareArray(newJokeArr,currentJokeArr){
        for(var i=newJokeArr.length - 1; i>=0; i--){
          for(var j=0; j<currentJokeArr.length; j++){
              if(newJokeArr[i] && (newJokeArr[i].id === currentJokeArr[j].id)){
                newJokeArr.splice(i, 1);
              }
          }
        }
        currentJokeArr.push(...newJokeArr);
        return currentJokeArr;
      },
      removeDuplicatesObject(arr) {        
        const key = 'id';
        const unique = [...new Map(arr.map(item => [item[key], item])).values()]
        return unique;
      }
    }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 10px;
  font-size: 20px;
  padding: 10px;
  text-align: left;
  border: 1px solid #42b983;
  border-radius: 5px;
}

li span{
  width:250px;
  display: inline-block;
}
li.Pun span{
  color:red;
  
}
li.Programming span{
  color:blue;
}

a {
  color: #42b983;
}
li.isFavoritetrue{
  border: 3px solid #42b983;
  box-shadow: 5px 5px #42b983;
}
select{
  border: 1px solid #35495E;
  border-radius: 4px;
  padding: 0.5em 0.6em;
  margin: 0 15px;
  width: 200px;
  background: transparent;
  transition: background-color .5s;
  font-size: 16px;
}
.headerCls { 
  height: 100px;
  display: flex;
  align-items: center;
}

div.jokeCount {
    display: flex;
    justify-content: left;
    margin-left: 15px;
}

.headerCls div.fetchNewJokes {
  flex: auto;
  display: flex;
  align-items: center;
}
</style>
