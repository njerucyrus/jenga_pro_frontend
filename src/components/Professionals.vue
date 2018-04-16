<template>
  <div>
    <jenga-pro-login-header></jenga-pro-login-header>
    <div class="row">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-8 col-md-offset-2">
            <div class="form-group">
              <div class="row">
                <div class="col-md-3" style="margin: 2px;">
                  <select class="form-control" v-model="category">
                    <option>Select professional category</option>
                    <option value="Foreman">Foremen</option>
                    <option value="Architect">Architects</option>
                    <option value="all">All</option>
                  </select>
                </div>
                <div class="col-md-8" style="margin: 2px;">
                  <input type="text" v-model="query" placeholder="Filter by professional name" v-on:keyup="search()"
                         class="form-control"/>
                </div>
              </div>
              <div class="row">
                <div class="col-md-5">
                  <img src="/static/images/ajax-loading-gif-3.gif" style="height: 32px; width: 32px;" v-if="loading">
                </div>
                <div class="col-md-4 pull-right">
                  <nav aria-label="pagination">
                    <ul class="pager">
                      <li><a href="#" :class="{'previous disabled': !prev }"
                             v-on:click.prevent="previousPage(prev)"><span
                        aria-hidden="true">&larr;</span>
                        Previous</a></li>
                      <li class="next"><a href="#" style="margin: 1px;" v-on:click.prevent="nextPage(next)">Next <span
                        aria-hidden="true">&rarr;</span></a></li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
            <div class="list-group" style="height: 100%" v-if="!query">
              <div class="list-group-item" v-for="account in accounts">
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
                    <button type="button" class="btn btn-fill pull-right" data-toggle="modal"
                            data-target="#exampleModal"
                            v-on:click="setProfDetails(account)">Hire Me
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="list-group" style="height: 100%" v-if="query">
              <div class="list-group-item" v-for="account in accounts">
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
                    <button type="button" class="btn btn-fill pull-right" data-toggle="modal"
                            data-target="#exampleModal"
                             v-on:click="setProfDetails(account)">Hire Me
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>


    </div>
    <!-- modal here-->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
              aria-hidden="true">&times;</span>
            </button>
            <h4 class="modal-title" id="exampleModalLabel">Work Description</h4>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="job_desc" class="control-label">Short Description of task</label>
                <textarea class="form-control" v-model="hireDesc" id="job_desc">

                  </textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" v-on:click="doHire">Submit</button>
          </div>
        </div>
      </div>
    </div>
    <!---end of modal -->
  </div>

</template>
<script>
  import { mapGetters } from 'vuex'
  import JengaProLoginHeader from "./LoginHeader.vue";

  export default {
    components: {
      JengaProLoginHeader
    },
    name: 'JengaProProfessionals',
    data() {
      return {
        query: '',
        category: 'all',
        userPayload: {},
        hireDesc: ''
      }
    },

    computed: {
      ...mapGetters(
        'accounts',
        {
          accounts: 'getAccounts',
          loading: 'getLoading',
          searchCount: 'getCount',
          next: 'getNextUrl',
          prev: 'getPreviousUrl',
        }
      ),



    },

    created() {
      this.$store.dispatch('accounts/fetchProfessionals')
    },

    methods: {
      search: function () {
        //search when the user has finished typing
        let timeout = null;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          this.$store.dispatch('accounts/searchProfessionals', {query: this.query, category: this.category})
        }, 500);
        console.log("in component : ",this.accounts);

        this.isSearching = this.query !== '';

      },
      nextPage(link) {
        alert(link);
        this.$store.dispatch('accounts/fetchPage', link)
      },
      previousPage(link) {
        alert(link);
        this.$store.dispatch('accounts/fetchPage', link)
      },
      setProfDetails(payload){
        console.log(payload);
        this.userPayload = payload
      },

      doHire(){

      }

    },
    watch: {
      category(newCategory) {
        if (newCategory) {
          this.$store.dispatch('accounts/filterByCategory', {query: this.query, category: newCategory})
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
