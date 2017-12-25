<template>
  <div class="container">
    <div class="wrap">
      <div class="tab">
        通讯录
      </div>
    </div>
    <div class="search">
      <input type="text" v-model="search" class="search-input" placeholder="搜索">
    </div>
    <div class="flex1" v-show="!search">
      <ul class="contact-list">
        <li class="contact-card" v-for="(item, key) in contactGroup" v-if="key >= 65 && item.contacts.length" :ref="`group${item.name}`" :key="key">
          <div class="group-name">{{item.name}}</div>
          <ul>
            <li class="item" v-for="(contact, index) in item.contacts" :key="index">
              <div class="contact-name">{{contact.name}}</div>
            </li>
          </ul>
        </li>
      </ul>
      <ul class="letter-list" @touchmove.prevent="scrollToLetter()">
        <li v-for="(letter, index) in letters" :id="letter" :key="index">
          {{ letter }}
        </li>
      </ul>
    </div>
    <div class="flex1" v-show="search">
      <ul>
        <li class="item" v-for="(contact, index) in searchContacts" :key="index">
          <div class="contact-name">{{contact.name}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import pinyin from 'chinese-to-pinyin'
import BScroll from 'better-scroll'

export default {
  data () {
    return {
      search: '',
      letters: [],
      contactGroup: [],
      tops: {},
      selectedLetter: '',
      scroller: null,
      contacts: [
        {
          name: '卫庄',
          mobile: 13373011225
        },
        {
          name: '红莲',
          mobile: 13373013444
        },
        {
          name: '韩非',
          mobile: 13377632225
        },
        {
          name: '张良',
          mobile: 15973011225
        },
        {
          name: '紫女',
          mobile: 13373009325
        },
        {
          name: '盖聂',
          mobile: 13309141225
        },
        {
          name: '白凤',
          mobile: 13370918525
        },
        {
          name: '墨鸦',
          mobile: 13793018472
        },
        {
          name: '刘邦',
          mobile: 13768208472
        },
        {
          name: '项羽',
          mobile: 13793981072
        },
        {
          name: '荆天明',
          mobile: 13793101172
        },
        {
          name: '荆轲',
          mobile: 13793011902
        },
        {
          name: '姬如千泷',
          mobile: 13793677830
        },
        {
          name: '嬴政',
          mobile: 13793019801
        },
        {
          name: '仇千尺',
          mobile: 13793019801
        }
      ],
      searchContacts: [],
      searchScroller: null
    }
  },
  created () {
    for (let i = 65; i < 91; i++) {
      let letter = String.fromCharCode(i)
      this.letters.push(letter)
      this.$set(this.contactGroup, i, {
        name: letter,
        contacts: []
      })
      this.$set(this.tops, letter, null)
    }
  },
  mounted () {
    this.contacts = this.contacts.map((contact) => {
      let pin = pinyin(contact.name, { noTone: true })
      return {
        pin,
        firstLetter: pin.substring(0, 1).toUpperCase(),
        ...contact
      }
    })
    this.contacts.sort((c1, c2) => {
      if (c1.pin < c2.pin) {
        return -1
      } else {
        return 1
      }
    })
    this.contacts.forEach((contact) => {
      let c = this.contactGroup[contact.firstLetter.charCodeAt(0)].contacts
      this.$set(c, c.length, contact)
    })
    this.$nextTick(() => {
      this.scroller = new BScroll(document.querySelector('.flex1'))
      let top = 0
      this.contactGroup.forEach((cg, i) => {
        if (cg.contacts.length) {
          this.tops[cg.name] = top
          top += this.$refs[`group${cg.name}`][0].offsetHeight
        }
      })
    })
  },
  methods: {
    scrollToLetter (e) {
      e = e || event
      const touch = e.changedTouches[0]
      const letterE = document.elementFromPoint(touch.clientX, touch.clientY)
      if (!letterE) return
      const letter = letterE.id
      if (letter === this.selectedLetter) return
      this.selectedLetter = letter
      if (this.tops[letter] !== null) {
        if (this.tops[letter] < -this.scroller.maxScrollY) {
          this.scroller.scrollTo(0, -this.tops[letter])
        }
      }
    }
  },
  watch: {
    search (newS) {
      newS = newS.trim()
      if (!newS) return
      this.searchContacts = this.contacts.filter((c, i) => {
        return c.name.indexOf(newS) >= 0 || c.pin.indexOf(newS) >= 0
      })
      this.$nextTick(() => {
        if (this.searchScroller) {
          this.searchScroller.refresh()
        } else {
          this.searchScroller = new BScroll(document.querySelectorAll('.flex1')[1])
        }
      })
    }
  }
}
</script>

<style scoped>
.container {
  height: 100%;
  background: #000000;
  display: flex;
  flex-direction: column;
}
.wrap {
  position: relative;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
}

.search {
  margin: 10px;
  margin-top: 5px;
  height: 33px;
  line-height: 33px;
  background: #999999;
  border-radius: 55px;
  padding-left: 30px;
}
.search-input {
  height: 16px;
  background: transparent;
  border: none;
  outline: none;
  width: 300px;
}
.flex1 {
  flex: 1;
  position: relative;
  height: 0;
  overflow: hidden;
}
.contact-list {
}
.contact-card {
}
.group-name {
  color: #ffffff;
  font-size: 16px;
  background: #333333;
  height: 30px;
  line-height: 30px;
  padding-left: 15px;
}
.item {
  position: relative;
  padding: 15px;
}
.item::after {
  display: block;
  content: '';
  position: absolute;
  bottom: 0;
  left: 15px;
  right: 20px;
  height: 1px;
  transform: scaleY(0.5);
  background: #333333;
}
.contact-name {
  font-size: 16px;
  color: #ffffff;
}
.letter-list {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: absolute;
  top: 90px;
  bottom: 90px;
  right: -10px;
  font-size: 10px;
  width: 50px;
  text-align: center;
  color: #ffffff;
}
.letter-list li {
  flex: 1;
}
.select-letter {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 100px;
  height: 100px;
  margin-left: -50px;
  margin-top: -50px;
  text-align: center;
  line-height: 100px;
  background: #999999;
  z-index: 200;
  border-radius: 20px;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave {
  opacity: 1;
}
.fade-enter-active,
.fade-leave-active {
  transition: 1s;
}
</style>