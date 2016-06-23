(function() {
  'use strict'

  var cards = [].slice.call(document.querySelectorAll('.card')),
      getRandom = function(n) {

        return Math.floor(Math.random() * n)
      },
      isEqual = function (array) {

        if (array[0].id != array[1].id) return false;
        return true;
      },
      flipped = [];

  cards.forEach(function(card) {

    // Apply rainbow gamma of colors to cards
    var color = 'hsl(' + getRandom(360) + ',80%' + ',60%)'
    card.firstElementChild.style.backgroundColor = color

    // Add click event to flip card
    card.addEventListener('click', function(e) {

      if (!this.classList.contains('flip') || this.classList.contains('tada')) {

        this.classList.remove('tada')
        this.style.removeProperty('animation');
        this.classList.add('flip')
        this.style.cursor = 'default'
        cards.splice(cards.indexOf(card), 1)
        flipped.push(this);
        if (flipped.length == 2) {

          if (!isEqual(flipped)) {

            flipped.forEach(function(card) {

              setTimeout(function() {

                card.classList.remove('flip')
                card.style.animation = 'isflip .7s cubic-bezier(0.62, 0.01, 0.22, 1.62)'
                card.style.cursor = 'pointer'
                cards.push(card)
              }, 1400)
            })
            flipped = []
          } else {

            flipped.forEach(function(card){
              card.classList.add('assert')
            })
            flipped = []
          }
        }
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
        cards[randomCard].style.removeProperty('animation')
      }, 0)

      setTimeout(tada, 4000)
    }
  }

  // Call tada
  var timer = setTimeout(tada, 4000)

  // Distribute cards
  function shuffle(array) {

    for (var i = array.length - 1; i > 0; i--) {

        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    return array;
  }

  var shuffled = shuffle([1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8])

  for(var i = 0; i < cards.length; i++) {

    cards[i].lastElementChild.style.backgroundImage = 'url(./img/dino' + shuffled[i] + '.svg)'
    cards[i].setAttribute("id", shuffled[i])
  }

})()
