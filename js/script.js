(function() {
  'use strict'

  var cards = [].slice.call(document.querySelectorAll('.card')),
      getRandom = function(n) {
        return Math.floor(Math.random() * n)
      }

  cards.forEach(function(card) {

    // Apply rainbow gamma of colors to cards
    var color = 'hsl(' + getRandom(360) + ',80%' + ',60%)'
    card.firstElementChild.style.backgroundColor = color

    // Add click event to flip card
    card.addEventListener('click', function(e) {

      if (!this.classList.contains('flip') || this.classList.contains('tada')) {
        this.classList.remove('tada')
        this.classList.add('flip')
        this.style.cursor = 'default'

        cards.splice(cards.indexOf(card), 1)
      }
    })
  })

  // Apply tada animation to random card each 4 seconds
  function tada(timestamp) {

    if (cards.length < 1) {

      clearTimeout(timer)
    } else {

      cards.forEach(function(card) {
        card.classList.remove('tada')
      })

      var randomCard = getRandom(cards.length)

      setTimeout(function() {
        cards[randomCard].classList.add('tada')
      }, 0)

      setTimeout(tada, 4000)
    }
  }

  // Call tada
  var timer = setTimeout(tada, 4000)
})()
