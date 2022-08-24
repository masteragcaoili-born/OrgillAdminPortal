<template>
  <section class="mt-5">
  <div class="container mb-4" v-if="addState">
    <div class="row">
      <div class="col-md-12">
        <div class="card" >
          <div class="card-body">
            <div class="card-title mb-4">
              <h4>Edit Configuration</h4>
            </div>
            <form class= "config-form" @submit.prevent="editNewConfig">
              <input type="hidden" v-model="configDetails.id"/>
              <div class="form-group">
                <div class="col-md-4">
                  <label for="title">EPCC Store Id:</label>
                  <input type="text" v-model="configDetails.EPCC_storeId" class="form-control" />
                </div>
                <div class="col-md-4">
                  <label for="title">EPCC Client Id:</label>
                  <input type="text" v-model="configDetails.EPCC_clientId" class="form-control" />
                </div>
                <div class="col-md-4">
                  <label for="title">EPCC Client Secret:</label>
                  <input type="text" v-model="configDetails.EPCC_clientSecret" class="form-control" />
                </div>
              </div>
              <div class="form-group">
                <div class="col-md-4">
                  <label for="title">EPCC url:</label>
                  <input type="text" v-model="configDetails.EPCC_url" class="form-control" />
                </div>
                <div class="col-md-4">
                  <label for="title">Algolia Application Id:</label>
                  <input type="text" v-model="configDetails.algolia_applicationId" class="form-control" />
                </div>
                <div class="col-md-4">
                  <label for="title"> Algolia WriteKey:</label>
                  <input type="text" v-model="configDetails.algolia_writeKey" class="form-control" />
                </div>
              </div>
              <div class="form-group">
                <div class="col-md-4">
                  <label for="title">Algolia SearchKey:</label>
                  <input type="text" v-model="configDetails.algolia_searchKey" class="form-control" />
                </div>
                <div class="col-md-4">
                  <label for="title">Algolia AdminKey:</label>
                  <input type="text" v-model="configDetails.algolia_adminKey" class="form-control" />
                </div>
                <div class="col-md-4">
                  <label for="title">Algolia url:</label>
                  <input type="text" v-model="configDetails.algolia_url" class="form-control" />
                </div>
              </div><div class="form-group">
                <div class="col-md-4">
                  <label for="title">Custom Orgill url:</label>
                  <input type="text" v-model="configDetails.custom_orgill_url" class="form-control" />
                </div>
                <div class="col-md-4">
                  <label for="title">Dealaer Id:</label>
                  <input type="text" v-model="configDetails.dealaerId" class="form-control" />
                </div>
                <div class="col-md-4">
                  <label for="title">Unique Row Id:</label>
                  <input type="text" v-model="configDetails.uniqueRowId" class="form-control" />
                </div>
              </div><div class="form-group">
                <div class="col-md-4">
                  <label for="title">Domain</label>
                  <input type="text" v-model="configDetails.domain" class="form-control" />
                </div>
              </div>
              <div class="form-group">
                <button class="btn btn-info" type="button" @click="onCancel()">Cancel</button>
                <button class="btn btn-primary"  type="submit" value="Submit">
                  <span
                    class="spinner-border spinner-border-sm"
                    v-if="addLoading"
                    role="status"
                    aria-hidden="true"
                  ></span>Update
                </button>
                <button class="btn btn-info" type="button" @click="deleteData(configDetails.id)">Delete</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container" style="max-width:fit-content">
    <div class="row" style="max-width: inherit;">
      <div class="" >
        <div class="card bg-light p-1 showdow-sm">
          <h2>Configuration Data</h2>
          <div class="card-body">
            <button class="btn btn-info" type="button" @click="addNew()">Add New</button>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">EPCC Store Id</th>
                  <th scope="col">EPCC Client Id</th>
                  <th scope="col">EPCC Client Secret</th>
                  <th scope="col">EPCC url</th>
                  <th scope="col">Algolia Application Id</th>
                  <th scope="col">Algolia WriteKey</th>
                  <th scope="col">Algolia SearchKey</th>
                  <th scope="col">Algolia AdminKey</th>
                  <th scope="col">Algolia url</th>
                  <th scope="col">Custom Orgill url</th>
                  <th scope="col">Dealaer Id</th>
                  <th scope="col">Date Modified</th>
                  <th scope="col">Unique Row Id</th>
                  <th scope="col">Domain</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <div
                v-if="dataLoading"
                class="spinner-border"
                style="width: 3rem; height: 3rem;"
                role="status"
              >
                <span class="sr-only">Loading...</span>
              </div>
              <tbody v-else>
                <tr v-for="(data, index) in configData" :key="index">
                  <td> {{ data.id }} </td>
                  <td> {{ data.EPCC_storeId }} </td>
                  <td> {{ data.EPCC_clientId }} </td>
                  <td> {{ data.EPCC_clientSecret }} </td>
                  <td> {{ data.EPCC_url }} </td>
                  <td> {{ data.algolia_applicationId }} </td>
                  <td> {{ data.algolia_writeKey }} </td>
                  <td> {{ data.algolia_searchKey }} </td>
                  <td> {{ data.algolia_adminKey }} </td>
                  <td> {{ data.algolia_url }} </td>
                  <td> {{ data.custom_orgill_url }} </td>
                  <td> {{ data.dealaerId }} </td>
                  <td> {{ data.dateModified }} </td>
                  <td> {{ data.uniqueRowId }} </td>
                  <td> {{ data.domain }} </td>
                  <td>
                    <button class="btn btn-info" @click="editConfig(data.id)">Edit</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
    </section>
</template>
<style>
.form-group {
    display: flex;
}
</style>
<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      configData: [],
      dataLoading: false,
      configDetails: {
        id:  '',
        EPCC_storeId:  '',
        EPCC_clientId:  '',
        EPCC_clientSecret:  '',
        EPCC_url:  '',
        algolia_applicationId:  '',
        algolia_writeKey:  '',
        algolia_searchKey:  '',
        algolia_adminKey:  '',
        algolia_url:  '',
        custom_orgill_url:  '',
        dealaerId:  '',
        uniqueRowId:  '',
        domain:  '',
      },
      allconfig: [],
      addState: false,
      addLoading: false,
      configLoading: false,
      isValid: false
    }
  },
  methods: {

    async getconfigDatas() {
      this.dataLoading = true
      try {
        let data = await this.$axios.$get('/config-data')
        this.configData = data
        this.dataLoading = false
      } catch (err) {
        this.dataLoading = false
        console.log(err)
      }
    },
    onCancel(){
      this.configDetails = {}
      this.getconfigDatas() // we will create this function later
      this.addState = false;
    },
    addNew() {
      this.configDetails = {}
      this.getconfigDatas() // we will create this function later
      this.addState = true;
    },
    async editConfig(id) {
      this.dataLoading = true
      try {
        let data = await this.$axios.$get('/update/' + id )
        this.configDetails.id = data.id
        this.configDetails.EPCC_storeId = data.EPCC_storeId
        this.configDetails.EPCC_clientId = data.EPCC_clientId
        this.configDetails.EPCC_clientSecret = data.EPCC_clientSecret
        this.configDetails.EPCC_url = data.EPCC_url
        this.configDetails.algolia_applicationId = data.algolia_applicationId
        this.configDetails.algolia_writeKey = data.algolia_writeKey
        this.configDetails.algolia_searchKey = data.algolia_searchKey
        this.configDetails.algolia_adminKey = data.algolia_adminKey
        this.configDetails.algolia_url = data.algolia_url
        this.configDetails.custom_orgill_url = data.custom_orgill_url
        this.configDetails.dealaerId = data.dealaerId
        this.configDetails.dateModified = data.dateModified
        this.configDetails.uniqueRowId = data.uniqueRowId
        this.configDetails.domain = data.domain
        this.dataLoading = false
        this.addState = true;
        window.scrollTo(0,0);
      } catch (err) {
        this.dataLoading = false
        this.addState = false;
      }
    },
    editNewConfig() {
      let params = {
        id:  this.configDetails.id,
        EPCC_storeId:  this.configDetails.EPCC_storeId,
        EPCC_clientId:  this.configDetails.EPCC_clientId,
        EPCC_clientSecret:  this.configDetails.EPCC_clientSecret,
        EPCC_url:  this.configDetails.EPCC_url,
        algolia_applicationId:  this.configDetails.algolia_applicationId,
        algolia_writeKey:  this.configDetails.algolia_writeKey,
        algolia_searchKey:  this.configDetails.algolia_searchKey,
        algolia_adminKey:  this.configDetails.algolia_adminKey,
        algolia_url:  this.configDetails.algolia_url,
        custom_orgill_url:  this.configDetails.custom_orgill_url,
        dealaerId:  this.configDetails.dealaerId,
        uniqueRowId:  this.configDetails.uniqueRowId,
        domain:  this.configDetails.domain,
      }
      this.addLoading = true
      this.$axios
        .$post('/update', params)
        .then(response => {
          console.log(response)
          this.addLoading = false
          this.configDetails = {}
          this.getconfigDatas() // we will create this function later
          this.addState = false;
          swal('Success', 'Configuration Data Updated', 'success')
        })
        .catch(err => {
          this.addLoading = false
          this.addState = true;
          swal('Error', 'Something Went wrong', 'error')
          this.getconfigDatas()
          console.log(err)
        })
    },
    deleteData(id) {
      swal({
        title: 'Are you sure?',
        text: 'Once deleted, you will not be able to recover this Data!',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          this.$axios
            .$delete('/delete/' + id)
            .then(response => {
              swal('Poof! Your Data file has been deleted!', {
                icon: 'success'
              })
              this.configDetails = {}
              this.getconfigDatas() // we will create this function later
              this.addState = false;
            })
            .catch(err => {
              swal('Error', 'Somethimg went wrong', 'error')
            })
        } else {
          swal('Your Data is not Deleted...')
        }
      })
    }
  },
  created() {
    this.getconfigDatas()
  }
}
</script>
