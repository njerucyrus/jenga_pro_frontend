<template>
  <div class="list-group scrollable" v-if="query == '' " style="height: 100%">
    <div class="list-group-item" v-for="account in searchResults">
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
          <button type="button" class="btn btn-fill pull-right" data-toggle="modal" data-target="#exampleModal"
                  data-whatever="@getbootstrap">Hire Me
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
//    data() {
//      return {
//        query: '',
//        category: 'Foreman',
//        isSearching: false
//      }
//    },
//    name: 'ProfessionalSearchResults',
//    computed: {
//      ...mapGetters(
//        'professionals', {
//          loading: 'getIsSearching',
//          searchResults: 'getProfessionals',
//          searchCount: 'getCount',
//          next: 'getNextUrl',
//          prev: 'getPreviousUrl',
//        }
//      ),
//
//    },

  }
</script>
