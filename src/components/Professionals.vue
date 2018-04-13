<template>
  <div>
    <jenga-pro-login-header></jenga-pro-login-header>
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-8 col-md-offset-2">
          <div class="form-group">
            <div class="row">
              <div class="col-md-4">
                <select class="form-control" v-model="category">
                  <option>Select professional category</option>
                  <option value="Foreman">Foremen</option>
                  <option value="Architect">Architects</option>
                </select>
              </div>
              <div class="col-md-8">
                <input type="text" v-model="query" placeholder="Filter by professional name" v-on:keyup="search"
                       class="form-control"/>
              </div>
            </div>
          </div>
          <div class="list-group" v-if="!isSearching">

            <div class="list-group-item" v-for="account in professionals">
              <div class="row">
                <div class="col-md-2">
                  <img class="img-responsive avatar" :src="account.avatar_url" style="height: 100%;width: 100%;"
                       v-if="account.avatar_url"/>
                  <img class="img-responsive avatar" src="/static/images/no_avatar.png"
                       style="height: 64px;width: 64px;" v-else-if="!account.avatar_url"/>
                </div>
                <div class="col-md-10">
                  <span
                    style="color: #000;">{{account.user.first_name}} &nbsp; {{account.user.last_name}} ||  {{account.account_type}}</span>
                  <br/>
                  <p>{{ account.about_me }}</p>
                  <button type="button" class="btn btn-fill pull-right" data-toggle="modal" data-target="#exampleModal" data-whatever="@getbootstrap">Hire Me</button>
                </div>
              </div>

            </div>
          </div>

          <div class="list-group" v-else-if="isSearching" style="margin-bottom: 25px;">
            <div v-if="loading" class="col-md-2 col-md-offset-5">
              <img src="/static/images/circle_loader.gif" style="margin: 15px;"/>
            </div>

            <div v-if="searchResults.length === 0">
              <span v-if="!loading">No Matching results found!</span>
            </div>
          </div>

          <div class="row">
            <div v-if="searchResults.length > 0 && !loading" class="col-md-5 pull-left">
              <span>Found {{ searchCount }} Professional<span v-if="searchCount > 1">s</span></span>
            </div>
            <div class="col-md-4 pull-right" v-if="searchResults.length > 0">
              <nav aria-label="pagination">
                <ul class="pager">
                  <li><a href="#" :class="{'previous disabled': !prev }" v-on:click.prevent="previousPage(prev)"><span aria-hidden="true">&larr;</span>
                    Previous</a></li>
                  <li class="next"><a href="#" style="margin: 1px;" v-on:click.prevent="nextPage(next)">Next <span aria-hidden="true">&rarr;</span></a></li>
                </ul>
              </nav>
            </div>
          </div>

          <div class="list-group-item" v-if="searchResults.length > 0" v-for="account in searchResults">
            <div class="row">
              <div class="col-md-2">
                <img class="img-responsive avatar" :src="account.avatar_url" style="height: 100%;width: 100%;"
                     v-if="account.avatar_url"/>
                <img class="img-responsive avatar" src="/static/images/no_avatar.png"
                     style="height: 64px;width: 64px;" v-else-if="!account.avatar_url"/>
              </div>
              <div class="col-md-10">
                  <span
                    style="color: #000;">{{account.user.first_name}} &nbsp; {{account.user.last_name}} ||  {{account.account_type}}</span>
                <br/>
                <p>{{ account.about_me }}</p>

                <button type="button" class="btn btn-fill pull-right" data-toggle="modal" data-target="#exampleModal" data-whatever="@getbootstrap">Hire Me</button>

              </div>
            </div>
          </div>
        </div>

        <!-- modal here-->
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="exampleModalLabel">Work Description</h4>
              </div>
              <div class="modal-body">
                <form>
                  <div class="form-group">
                    <label for="job_desc" class="control-label">Short Description of task</label>
                    <textarea class="form-control" id="job_desc">

                            </textarea>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Submit</button>
              </div>
            </div>
          </div>
        </div>
        <!---end of modal -->
      </div>

    </div>
  </div>

</template>
<script>
  import {mapGetters} from 'vuex'
  import JengaProLoginHeader from "./LoginHeader.vue";

  export default {
    components: {JengaProLoginHeader},
    name: 'JengaProProfessionals',

    computed: {
      ...mapGetters(
        {
          professionals: 'accounts/getProfessionals',
          loading: 'professionals/getIsSearching',
          searchResults: 'professionals/getSearchResults',
          searchCount: 'professionals/getCount',
          next: 'professionals/getNextUrl',
          prev: 'professionals/getPreviousUrl',
        }
      ),

    },
    data() {
      return {
        query: '',
        category: 'Foreman',
        isSearching: false
      }
    },
    created() {
      this.$store.dispatch('professionals/filterByCategory', {query:this.query, category: this.category})
    },
    methods: {
      search: function () {
        //search when the user has finished typing
        let timeout = null;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          this.$store.dispatch('professionals/searchProfessionals', {query:this.query, category: this.category})
        }, 500);

        this.isSearching = this.query !== '';

      },
      nextPage(link) {
        alert(link)
        this.$store.dispatch('fetchPage', link)
      },
      previousPage(link) {
        alert(link)
        this.$store.dispatch('fetchPage', link)
      },
    },
      watch: {
        category(newCategory){
         if (newCategory){
           this.$store.dispatch('professionals/filterByCategory', {category: newCategory})
         }
        }
    },

  }
</script>

<style scoped>
  .account {
    border-radius: 5px;
    border-style: solid;
    border-color: #0a0909;
  }

  .box {
    align-items: baseline;
    flex-flow: row;
  }
</style>
