<template>
  <div>
    <jenga-pro-login-header></jenga-pro-login-header>
    <div class="container container-fluid">
      <div class="row">
        <div class="col-md-10 col-md-offset-1">
          <div class="table-responsive">
            <table class="table table-striped">
              <thead>
              <tr>
                <td colspan="4">
                  <div class="col-md-6 pull-left">
                    <h6 class="header">My Contract List</h6>
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
                </td>
              </tr>
              <tr>
                <th>Contract Details</th>
                <th>Work Description</th>
                <th>Contract Status</th>
                <th>Action</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="contract in contracts">
                <td>
                  <p v-if="contract.employer.username=== currentUser[0].user.username">
                    Sent To {{ contract.professional.first_name}} &nbsp;{{ contract.professional.last_name}}
                  </p>
                  <p v-else-if="contract.employer.username !== currentUser[0].user.username">
                    From {{ contract.employer.first_name}} &nbsp;{{ contract.employer.last_name}}
                  </p>
                </td>
                <td>{{ contract.job_desc }}</td>
                <td>
                  <span v-if="contract.is_active">
                    Confirmed
                  </span>
                  <span v-if="!contract.is_active && !contract.rejected && !contract.ended ">
                    Pending
                  </span>
                  <span v-if="!contract.is_active && !contract.rejected  && contract.ended">
                    Ended
                  </span>
                  <span v-if="!contract.is_active  && !contract.ended && contract.rejected">
                    Rejected
                  </span>

                </td>
                <td colspan="2">
                  <div>
                    <button v-if="contract.is_active"
                            class="btn btn-xs btn-primary" v-on:click="endContract(contract.id)">End Contract
                    </button>
                    <button v-on:click="cancelContract(contract.id)"
                            v-if="contract.employer.username === currentUser[0].user.username && !contract.is_active && !contract.ended  "
                            class="btn btn-fill">
                      Cancel Contract
                    </button>
                    <button
                      v-if="contract.professional.username === currentUser[0].user.username && !contract.is_active && !contract.rejected && !contract.ended "
                      class="btn btn-xs btn-primary" v-on:click="acceptContract(contract.id)">Accept
                    </button>
                    <button
                      v-if="contract.professional.username === currentUser[0].user.username && !contract.rejected && !contract.is_active && !contract.ended"
                      class="btn btn-fill" v-on:click="rejectContract(contract.id)">
                      Reject
                    </button>
                    <button
                      v-if="contract.professional.username === currentUser[0].user.username && contract.rejected && !contract.is_active "
                      class="btn btn-xs btn-info" v-on:click="undoReject(contract.id)">
                      Undo Reject
                    </button>
                  </div>
                </td>
              </tr>
              </tbody>
              <tfoot>
              <tr>
                <td colspan="4">
                  <div class="pull-right">
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
                </td>
              </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import JengaProLoginHeader from "./LoginHeader.vue";

  export default {
    components: {JengaProLoginHeader},
    name: "JengaProContracts",
    computed: {

      ...mapGetters('contracts',
        {
          contracts: 'getContracts',
          success: 'getSuccessMsg',
          error: 'getError',
          next: 'getNextUrl',
          prev: 'getPreviousUrl',
        }),

      ...mapGetters('auth',
        {
          currentUser: 'getCurrentUser',
          auth_token: 'getAuthToken'
        })
    },
    created() {
      this.$store.dispatch('contracts/fetchContracts', this.currentUser[0].user.username)

    },

    methods: {
      acceptContract(pk) {
        let payload = {pk: pk, is_active: true, auth_token: this.auth_token};
        const confirm = window.confirm("Accept the Contract ?");
        if (confirm) {
          this.$store.dispatch('contracts/acceptContract', payload);

        }

      },
      rejectContract(pk) {
        let payload = {pk: pk, is_active: false, rejected:true, auth_token: this.auth_token};
        const confirm = window.confirm("Reject the Contract ?");
        if (confirm) {
          this.$store.dispatch('contracts/rejectContract', payload);

        }
      },
      undoReject(pk){
        let payload = {pk: pk, is_active: false, rejected:false, auth_token: this.auth_token};
        const confirm = window.confirm("Undo Rejecting the Contract ?");
        if (confirm) {
          this.$store.dispatch('contracts/rejectContract', payload);

        }
      },

      cancelContract(pk) {
        let payload = {pk: pk, auth_token: this.auth_token};
        const confirm = window.confirm("Are You Sure you want to Cancel the Contract ?" +
          "This Contract will be removed permanently ");
        if (confirm) {
          this.$store.dispatch('contracts/cancelContract', payload);

        }
      },
      endContract(pk) {

        let payload = {pk: pk, is_active: false, ended:true, auth_token: this.auth_token};
        const confirm = window.confirm("Reject the Contract ?");
        if (confirm) {
          this.$store.dispatch('contracts/endContract', payload);

        }
      },

      nextPage(link) {
        this.$store.dispatch('contracts/fetchPage', link)
      },
      previousPage(link) {

        this.$store.dispatch('contracts/fetchPage', link)
      },
    },
    watch: {
      success(newVal){
        if (newVal && newVal !== ''){
          window.location.reload()
        }
      },

      error(){

      },


    }
  }
</script>
