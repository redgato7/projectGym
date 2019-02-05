<template>
  <panel title="Kalkulator maksymalnego poboru tlenu">

    <div class="opis">
      W teście Coopera zadaniem jest przebiec jak największy dystans w czasie 12 minut.
       Znając nasz wynik (dystans w metrach), możemy obliczyć w przybliżeniu nasze VO2max
    </div>

    <v-btn
      @click="dialog = true"
      class="teal accent-3"
      light

    >
      <v-icon>accessibility</v-icon>
    </v-btn>

    <v-dialog
      v-model="dialog"
      width="500"
    >

      <v-card class="form">

        <v-card-title
          class="form-title"
          primary-title

        >
          Kalkulator maksymalnego poboru tlenu
        </v-card-title>

        <v-select
          v-model="selected"
          :items="items"
          item-text="state"
          label="Płeć"
          persistent-hint
          return-object
          single-line
        ></v-select>

        <v-select
          v-model="select"
          :items="items2"
          item-text="state"
          label="Wiek"
          persistent-hint
          return-object
          single-line
        ></v-select>

        <v-text-field
          :value="form.iloscMetrow"
          v-model="form.iloscMetrow"
          name="iloscMetrow"
          id="iloscMetrow"
          @keyup.enter="updateMetrow"
          @blur="updateMetrow"
          @input.native="updateMetrow"
          maxlength="4"
          label="Dystans [m]"

        ></v-text-field>


        <v-text-field
          v-model="form.iloscCzasu"
          :value="form.iloscCzasu"
          disabled
          input="12"
          class="form-control"
          name="iloscCzasu"
          id="iloscCzasu"
          label="Czas [min]"
          placeholder="12"

        ></v-text-field>

        <v-text-field
          disabled
          v-model="form.total"
          step="any"
          class="form-control"
          name="total"
          id="total"
          maxlength="4"
          label="Maksymalny pobór tlenu [ml/kg/min]"
          readonly
        ></v-text-field>


        <v-card-actions class="form-button">



          <v-spacer>

          </v-spacer>


          <v-btn

            dark
            class="teal darken-2"
            @click="dialog2 = true"
            >
            podgląd
          </v-btn>

          <v-tooltip top>
          <v-btn
            slot="activator"
            dark
            class="teal darken-2"
            @click="reset"
            >
            reset
          </v-btn>
          <span>Wyczyść formę</span>
          </v-tooltip>

          <v-tooltip top>
          <v-btn
            slot="activator"
            dark
            class="teal darken-2"
            @click="dialog = false"
            >
            Zamknij
          </v-btn>
          <span>Kliknij poza formę.</span>
          </v-tooltip>

          <v-dialog v-model="dialog2" max-width="500px" >
                  <v-card class="form">
                    <v-card-title
                      class="form-title2"
                      primary-title

                    >
                      Rezultat
                    </v-card-title>

                    <v-spacer>

                    </v-spacer>

                    <div class="form-opis2">Tabela kobiet</div>
  <table>
  <thead>
    <tr>
      <th>Wiek</th>
      <th>Źle</th>
      <th>Przeciętnie</th>
      <th>Dobrze</th>
      <th>Bardzo dobrze</th>
      <th>Wspaniale</th>
    </tr>
  </thead>
    <tr>
      <td>20 - 29</td>
      <td><36</td>
      <td>36 - 39</td>
      <td>40 - 43</td>
      <td>44 - 49</td>
      <td>>49</td>
    </tr>
    <tr>
      <td>30 - 39</td>
      <td><34</td>
      <td>34 - 36</td>
      <td>37 - 40</td>
      <td>41 - 45</td>
      <td>>45</td>
    </tr>
    <tr>
      <td>40 - 49</td>
      <td><32</td>
      <td>32 - 34</td>
      <td>35 - 38</td>
      <td>39 - 44</td>
      <td>>44</td>
    </tr>
    <tr>
      <td>50 - 59</td>
      <td><25</td>
      <td>25 - 28</td>
      <td>29 - 30</td>
      <td>31 - 34</td>
      <td>>34</td>
    </tr>
    <tr>
      <td>60 - 69</td>
      <td><26</td>
      <td>26 - 28</td>
      <td>29 - 34</td>
      <td>32 - 35</td>
      <td>>35</td>
    </tr>
    <tr>
      <td>70 - 79</td>
      <td><24</td>
      <td>24 - 26</td>
      <td>27 - 29</td>
      <td>30 - 35</td>
      <td>>35</td>
    </tr>
  </table>


<div class="form-opis2">Tabela Mężczyzn</div>

  <table>
  <thead>
    <tr>
      <th>Wiek</th>
      <th>Źle</th>
      <th>Przeciętnie</th>
      <th>Dobrze</th>
      <th>Bardzo dobrze</th>
      <th>Wspaniale</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>20 - 29</td>
      <td><42</td>
      <td>42 - 45</td>
      <td>46 - 50</td>
      <td>51 - 55</td>
      <td>>55</td>
    </tr>
    <tr>
      <td>30 - 39</td>
      <td><41</td>
      <td>41 - 43</td>
      <td>44 - 47</td>
      <td>48 - 53</td>
      <td>>53</td>
    </tr>
    <tr>
      <td>40 - 49</td>
      <td><38</td>
      <td>38 - 41</td>
      <td>42 - 45</td>
      <td>46 - 52</td>
      <td>>52</td>
    </tr>
    <tr>
      <td>50 - 59</td>
      <td><35</td>
      <td>35 - 37</td>
      <td>38 - 42</td>
      <td>43 - 49</td>
      <td>>49</td>
    </tr>
    <tr>
      <td>60 - 69</td>
      <td><31</td>
      <td>31 - 34</td>
      <td>35 - 38</td>
      <td>39 - 45</td>
      <td>>45</td>
    </tr>
    <tr>
      <td>70 - 79</td>
      <td><28</td>
      <td>28 - 30</td>
      <td>34 - 35</td>
      <td>36 - 41</td>
      <td>>41</td>
    </tr>
  </tbody>
  </table>

                    <v-card-actions class="form-button">

                      <v-spacer>

                      </v-spacer>

                      <v-btn
                        slot="activator"
                        dark
                        class="teal darken-2"
                        @click="dialog2=false"
                        >
                        Zamknij
                      </v-btn>

                      <v-spacer>

                      </v-spacer>

                    </v-card-actions>
                  </v-card>
                </v-dialog>

          <v-spacer>

          </v-spacer>

        </v-card-actions>


      </v-card>

      </v-dialog>
  </panel>
</template>

<script>
import round from 'vue-round-filter'
export default {
  data () {
    return {
      dialog: false,
      dialog2: false,
      form: {
        iloscCzasu: '',
        total: '',
        x: ''
      },
      items2: [
          { state: '20-29', wzor1_2: '90' },
          { state: '30-39', wzor1_2: '120' },
          { state: '40-49', wzor1_2: '120' },
          { state: '50-59', wzor1_2: '120' },
          { state: '60-69', wzor1_2: '120' },
          { state: '70-79', wzor1_2: '120' }

      ],
      items: [
          { state: 'Mężczyzna', wzor1: '1' },
          { state: 'Kobieta', wzor1: '1.25' }
      ]
    }
  },
  filters: {
    round
  },
  methods: {
    updateMetrow (event) {
      this.form.iloscMetrow = event.target.value
      this.x = (this.form.iloscMetrow - 504.9) / 44.73
      this.form.total = Number((this.x).toFixed(1))
    },
    okejka () {
      this.x = (this.form.iloscMetrow - 504.9) / 44.73
      this.form.total = Number((this.x).toFixed(1))
    },
    reset () {
      this.form.iloscMetrow = ''
      this.form.total = ''
      this.select = ''
      this.selected = ''
    },
    async cofniecie () {
      try {
        this.$router.go(this.$router.currentRoute)
      } catch (err) {
        console.log(err)
      }
    }
  }
}

</script>

<style scoped>
@media (min-width: 100px) { /* sm */
    .form-button {
      margin-top: 20px;
    }
}

@media (min-width: 600px) { /* sm */
    .form-button {
      margin-top: 20px;
      margin-left: 34%;
    }
}

@media (min-width: 992px) { /* md */
  .form-button {
    margin-top: 20px;
    margin-left: 34%;
  }
}

@media (min-width: 1200px) { /* lg */
  .form-button {
    margin-top: 20px;
    margin-left: 34%;
  }
}

.form-title{
  font-size: 30px;
  display:inline-block;
  color: #00796B;
  margin-bottom: 30px;
  border-bottom: solid;
}

.form-title2{
  font-size: 30px;
  display:inline-block;
  color: #00796B;
  margin-bottom: 30px;
  border-bottom: solid;
}

.form{
padding-left: 20px;
padding-right: 20px;
padding-bottom: 20px;

}

.opis{
min-height: 100px;
display: block;
margin-top: 1em;
margin-bottom: 1em;
margin-left: 0;
margin-right: 0
}

.form-opis{
font-size: 20px;
display:inline-block;
color: #00796B;

}

.form-opis2{
font-size: 15px;
display:inline-block;
color: #00796B;

}

.form-opis3{

font-size: 15px;

}

.kcal{
  display: block;
  margin-top: 1em;
  margin-bottom: 1em;
  margin-left: 0;
  margin-right: 0
}

table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
    text-align: center;
    justify-content: center;
}

td, th {
    border: 1px solid #dddddd;
    text-align: center;
    padding: 8px;
    width: 100%;

}


table tr:nth-child(even) {
    background-color: #80CBC4;
}
table tr:nth-child(odd) {
   background-color: #B2DFDB;
}
table th {
    background-color: #00796B;
    color: white;
}




</style>
