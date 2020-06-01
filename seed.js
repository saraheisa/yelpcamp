const mongoose = require('mongoose');
const Campground = require('./models/campground');
const Comment = require('./models/comment');

campgrounds = [
    {
        "name": "mountain sinai",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRnDlDte-ZTswsH2BGSpsh_SY5HvQWR2O9mbXmTF-NHCmfiGMDJ&usqp=CAU",
        "description": "Mount Sinai, traditionally known as Jabal Musa, is a mountain in the Sinai Peninsula of Egypt that is a possible location of the biblical Mount Sinai, the place where Moses received the Ten Commandments."
    },
    {
        "name": "wadi al hytan",
        "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExMWFhUXGBgYGBgYGBobGBoaFxcXGBgaFxcZHSgiHR0lHRoYIjEiJSkrLi4uGB8zODMtNygtLisBCgoKDg0OGhAQGC0dHR0tLS0tLS0tKy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAKYBMAMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAACAwABBAUGB//EADsQAAEDAgMHAQgBAwMDBQAAAAEAAhEhMQNBUQQSYXGBkfChBQYTIrHB0eHxFDJCB1JiFRaSJFNyotL/xAAYAQEBAQEBAAAAAAAAAAAAAAABAAIDBP/EACIRAQEBAQADAAMAAgMAAAAAAAABEQIDEiETMUEEcTJRYf/aAAwDAQACEQMRAD8A+ROwCCPrlaZk6Aq3OuBabaa18tzV7nEX+1DTJG0UyplpYHvM0Xdgsc63GfH05Qq3BXlTneIF7RwlMJGlP1+foiOHN+ozzvQ6qQXCsm9zNDf96ZoQ0k/fWKU7+qI4cctKTmdT1RbxOZtFeUR2SCwc6Dp1FJ5ZqPFP1948hM3DEQZjuNOkImMm30v5bpqoI5omPSe47/RC1tJHaKdetO60RFJvoaWzmfAphsM+aVtenl0gtmHHMxl0z1hC5umfXjN+S0lnCgpMchOt9E74NAfpFxE2ygpxaw4bTSOUis+qe3AJsB2k33dM4Hdam7PNAJi1OM510UdgTYSOkcb5GvNOM6yMY4SRaK6GCDGk+Vzbg4UZnjApURnS8ZaQt7tkJMgVNTrJqCO8Z5qhs+cGONr1mlde6cGua7DmdeQF9O4HZCcIRwvxt1FaeFdV2Dry1B6nyiTiUESYoSfS08fMywysLMOBIihmDOtKeWVBlPvlTl5VaS3KPL/XimjAsSY6DI0/lDTB8OBNPP5VsA8yz/C1nZw7/Ig8BA1hANjfN5/XJQKOCRaOevPSwVv2fh0ntrVdDC2Bwgm8WANORHlE1+waX40rkOC1jOuQ/CoLZnL105KDCmsR99Y9ey6T9lDXQTUHOkkK27MBdw69ZPYaDnpYtc/FwxYSaaXzNZMAR20S90VH4y4eXW3EDZpEZivT6rPuC8jlGiKSHYZj9TrHnHhQHGMqceI/C0OGg5Jfw8+1refVZIGN1t3PnNWRInj1rfzgi3FcFIocPDp55p6pvwhYTNQenH7clRaRU00+t/LppiggARW9YGc5+iYLSgOMRpc2i/U/hLLCIJmtRYm8VrTPwytBEcP2FeIBThSIPr4LJY1m3T5pEom8T9zQaeiecISA2L5jWInvqVHNBiBBzkjLQfa6DrnjDp5U5eisik+Z0jqUQr50qreImZmnSxqub0ANiMpBtExICrdOkZj0/BTHGmg/R18ugZbPU18rx5KCmkWJgAGY65TW8ckYbJNDY0HX1CLdIpT7T06o8LDmtrcje4SFgzW2c8NTA8jtbCT8pM0jPK9PVG2AeNRSsciPKK8FvAVGs5HskL+GZ+ta98z+eac7DAEEWBae5PAixTsM3+t7cR5dE3DBJkmYsB3k9loEjCMU3odcxenpQo8PDANdZpzjLhomEwKEXIEXtYHzJM2ZoJaZAGZzERY0zEdUo7A2SY17+X0yWrG2RsTNJtrWBewr5KWzFYLl03IixtFxytXomY+3MdADQ0STYE31vkE6zhjQ0xR1bTYgZcLlbMPCw3NoBIuJp6VNvRclu2lxktAjsOApEflJxPaDySR8sxQDSw7I9jOTdtfhlwAIEGBFeIk60OqwbZkToONr1yn8I2gFxgitbDnY2pWFrHs3eiLCgkXiItdYrcxyMZmYNJMNitrz6X7I9kcZ0zqTXh6H9ruP9k0AJEzcSREWB6/Xpj/6U8uIbIFgeQMkVrRGEreAlsiaUNjF4nOCjw9pDDk7MzcWiuiHbfYz8OprOccPQ3QbRsBAFxIoaQdLW/al+x4/tIySz5aaRUD0+qvZ9vaQd+sU0vxi3Dgl/wDSXkwC2SDWsRUyToYnyqNp2AtoY4FvD7zHcp0YXiY8CBHO+p6ZpAcSZJknWuevRbto9mOw2h2JQGMxvaW5Kf0AeDuOk8YA1NzS38I0+tYXOd0pw4U5GRKjCaTx19e/otGHskCSRBpSfWiBzXE59rdFaMA7DCD4Y0MzT8QtbcKdJoBGVY52p1TcDZCTeIzy4+qhjIMI0J56I8RhBqeWVD+QuzieyaSJMVnhnNOI7pA2KL2z11y8qtMVyXN850yura2y342zXIAFBQcoMSTxSThQeAPgvKQz7pkGeFOGvlUTsMmT9OFU9mA/de8N+VoG/wAN6APW3RG2gNicomhkVMitvUJjNZi2aQB3yyvbTnfS8MxkJPD8z9Fqx8EBzhZu9H9wdnqIBF6gRZBEgDdFCZOu9ME1y7D61UcoSM/MvBzVPjpl6mvmSNzDF/TgFH4Z++XP7+q5PQURkJitRobo2YVPvlYGB5mmswc4kCKdp9SnYOHFSIgfS3VMgpTMGbXp56IhgGJAJqR9CeNJGi2YeERArw76aI24RaQAN4mY80t1JTgYvgmD5oYVPpUZDpEi8Chn7rcdlggGsyY0GcjLkr/pnRJb6WnOZVi1h2RzrX06yuzsGyggmCTWlqZCUrD2Aj5mtJNt2KzA8uuidr3m7hLhuxWRSJtTnCZBa5G3MIdDrMJaIAiJkWAk1p06KYwkCZA0r56LZiYR3pFppUn6cgtIwYi9PvlCRbGRmykQ7KkDOpik8stEsM4VbkR9KVXQ+MWkV1iDHOOH4SHgGgvr/ChpDmEzQel8xnJujYwRHcWsKSNY+pUa0TWM5+1ERqRao1p6eWQtMwd0VggUmDJ6TyTm41gKV9e1B1Wffisfi37Ua80+3X6FK1tftJmh5CeMdqqxtTovGmk9eHlVg3yDI85jsjOJOfhoa8lJrx3OYQH73zCZdH9pNCBYyNNEbhhvNRFLaeX6LIXz0jPoh3yaSY885KOtrYY8BpnjFh60yTzi7jpIaaQLVBJyPdYcGG2mfQpQeS6cuXBZsbnVacPD+M+N0ugiBB6VkRUL2Hu57Iw2EyN4GTukChkzWnD1XkMLBgg/r9Lr4HtUtgCixedankysnvH7EYHOOCw7tRBJ+UipAM275rl7FsL3AS07gzAtJNF6PH9oYmI0tqyQc6mhHnNa/d15Y1++0OaY+W+QEnT9FH2N/K8h/wBKLnD4ckHIkSKVoDQVotuxbI0EhxO8JEC/Wi9Zj7JD99pa2Wy6JO7nRoOdiOK5ntn2e1o38PHBdJEMBpXOYy52W/lnxizKzYTGipMNJBAMEjmsO34oBaMODOfHmnYTpjNwINAJ1nST+Fo2zZm/Dgtr/dIECciYpFcvsse2Vr0ljj7Q2KEg0kZmv8eiw4zBJg/fsugzZ6S6aO+bSBEWtUgcymHYwWSBGvXj+V1l1w65xwSHNvBHpomYTYA0ImJvUiDHU91px9jA1/EX4fwn4mwnDa19Q1zQRBFSDumYtZ0U/K1PjGayObSIO8aiCKiLREzMfjNOHw/gOG6fiB7TJnd3SDSIubyTaVeCJiYihuOPAgWzGazvEERz+96eel19HPxzGMyrllp9kzdp6X8zTMNvRM+HkP3n52XN2LGGJqI/OX2TYJ6+VRhlRS2vW/BNw8OaAGfPP5UB7LQGbmn8+ZI3Yc/2mmZ4Vik8EtuETln9cl1tm2cNiZMyCJ9e/wBEz6r8c/B2MzUkTSt+cc/KLdhMeDlFpF5prddKBBJiB00yzWV4AcY8ziVr9Odusjcd5JMgATFTfhXgB0SnukwBf6cT6TzTsXWeVKjmeiz4gRpLDi2v31nuixMSDn1PBWW8Poh3fOSPY4WR26cMz/CU4T1laH4fetVQwuGv65q1Yy7v8IiOdPAn/Byg/aMlYwFaiWt7xp2F+CYYg0iPuRxsmFvh8+iDdlUqUaeU9Aggfz55KexiFzj+/OH1StA7ghcCBPPmbJjhW2fnDL0UeLeDyiRaBuLPpHMLThGlRUDqlYeFyjweck/DAmo7eisWn4OSc1k5DzwrNhtr+PPIWjCJHObZqw61swpFOnhyXS2WCCZileMCwOn5XP385k01k9vOULThYu7Y8oMcpjlVFinTr4DyWuaD8xETHP78ey0YXsf5i4Gd4CW0iRNbcVxdnxA14gUvPExTuu57N21rnaEZ3A7+WXHqWfp346l/bgbRsrfnBo4OmYJM/wDyiIitVj2rEeW7m9IANwvpWBsOHiBxLQQY3mjOJ7Lje2PdZjWl2HJ+WQOUX1NzRZ/JL8rp62f8XzzYmYjZZAcHamI8hdfYNneRVjYiREkxWT+p+iDYntDzvVuIi+UQtmyY5fAaI3Zj6AU8oun2VzuWORt+yEecfWq5O0CaCd3PXjHmi9F7Vw4AJrWDQ6AhcXGZBqdV11wzGUzS9QMzJsKV+iScKTcNMm9BnpXUW0WsMrQZpRETnAjMdaaET0UJGZmFafO60NZwtw88hPw8DM281RswfOtVzaZxgCRRb2bOXCnIx55C0bNsk1yKcMI2aDHr+EaSsDZ2tIg1+i0BlTM8PVHs+yxdMgW8qU6LGeIEZeFJeL655rViVn6/tDunl5/HdWiRhODca11vxQuw+/8APBdIMFcv5/E9kv4QRrTCMDzzy6gwvAAtwwVTsHzzkjUxFmZsMuHhVHB86Qt3waz5rPqi3YmgVqxzHYMX8HdCW651/hb3MukuwvP4TGaybuoPn0QwJ4aZrZiYJnWON+oQnCrnfqOq0LWXcniYnr56q3YcxI6Z9AtIw/t5Chw+HZaZ1k3ERH65cFr3IjK4z70VfDplw9ExM+756JjcO33p16/ZYNr9uYTHFtXkSDuxA4SftK52P7dxXAhrGtnMy409NMlz683HP9defD1f49HiANEudA1JAHcprIm4M8Z7L57j7S97j8QlxFiTMA6ZDkqZIiBHKv1XG/5Ofx1n+P8A+vpLKedvumxWv2Xjdn96MUOBc1rmihAG67UkRn6csvZbKQ9ocw/K4SI71Xbjy89/px78fXP7NbE1byi3HKq6mzOFwINMzFtFzmNyI18p3T8N1j5PPotX6Jceo9nbdu05fey07RilwzjQ5TNuNV5zZccAjTM/ruu3sW0zQrj1w78eR5jafZDsMucRIn+6si4FPLLkbFtnwn3kfcUmK6n16fQPbeOXYRFJAoYuPyvEbV7NF25itoGcAytc9Wz6upJ+he0NrDmjMOEyBJj7QuLiQ5sg1EU1r+PouszZREFwBEBwk1mekX8quftOzQCRqbWoY+/krU+CzWMnkfp6en4KTiEARI6Tr50TdnNSOxGuXFBjNiYETqBpXr+06z6uiMKLJ+Fssx53W7B2eRMLdgbLN6BcfZn1ZW4QEQTQ+UWjD2USa3tl6BaG7N6flOGDCb0ZGE4dfPXqlfCi3qEr217f2fZyWufvPEfIwS6us0BisErkH352cNJGHil0xuwwUzMgkI9416Wuz8DVR2DkuT/3vs27Iw8bORus+pfX9Lt7BtWFjgOwnteDoagmsEXB4FM7lF4s/hHw/PLoRhLq/wBMuT7b9q4Oz7ocfnLmjd0a4xvOMGAK8/UN6kZnNv6OGF5+FcDRb/6bRc/bvaez4LtzExGsJrFaVzIEDqjYcqBiY3Z8k7Zyx4DsN7Xt1aQ4dwnnBKtTD/SoHbKMlv8AhlQt4K2q45h2NAdjN810nN4DyED2nktS1nI5TtmKp2Fw8zXTLShcyVrWccx2HfzsuJ7zbduN+G0kPcOzefGtuK9a7DBy8uvm/vPj/wDqsSawd0DOABbrJ6lc/L3Zz8dvD45evv8AHNYTYCDNjYjgU0Pg2NdK9EeCTnTgb90xrRnPBeCvbhGJV1QRIj8WRHn+k8sAy7fhC4bwNK/mxRqZ8TDgyBzXqfcfa5+JgnL52jSaOHCu6epXm7ia2XQ93dqOHtOHo47jtPmpXrB6Lr4+s6jn5JvNe+a2sQrYNO6a7DUbheQvd7PDimOjouhs+0EXKxNHRWwc/Xp5wVrUjufHDhB/JquftmCBvaEUGQM1jgaoGYp655JuEZyvxIOdLrFdeXniwh8ugCQCBeBeh+95R+2sANG4CJ7G/nom7fgfOQYAMwT6cP5KTtWzz8xJnMyc89U6ccZjPmFpGmflO3FTEEkgNvlFq2Wg4EWMHhmP0hcyg84H7qlWPX4ODOQ6fhaWYPOPPOi1Yezp2IxrWl73BrQJLnEAAcSbLyfkjfo4ntr2pg7Nh7+KYmd1oEuedGjPKthqvnvtr3mxtoxD8J78LCA3Q0GCbyXFucZSY7rD70+3DtG0PeJLWkjDmwaDSBqb61XOwXTNahHXdv6M5kC5orVLw8PIHiSn/BpvSI5rFi44EgXWJ9/TovHeTQWCU/Hggi+tii3sh0lVibKTd3otzJ+xtdzYPefbAwNGO7dEGzSRoC4iY4SuVt+2fFcd9xLiZc413vPwiwz8u6Ism4eC1omhPnFZvX36pDNh23GYwsZjYjGmu4HuaOwKRiMgGIWh7qGAsfwXAVII6/VZ3Tjre5/tfC2faPiYu/BY4QzN1IDgSARE8jC9zh+/myEiWYwGpa2B/wCLyV8vwsBhAO7VNIIsV097PkYvEv2vuHs/Gwsdgfgva9p/25cHC4PAp7tk4L4p7K9sY+A5zsDELCRBIggjL5XAieJFKrqN979vmf6h3VuGeVNxa/L/ANs/ifUzsiUdlXnfYv8AqHhlhG1tIeLHDYSHit2z8pFM4M5Lof8AfuwETv4k5j4T5HOkdiVueTWL4q2v2ZAdnWDaPfzYA2Q57j/tGG4HlLgAO65bv9Rdn/8AZxYz/s//AF91r8jP4q77tn088qvmHvJghm2YwiJc0gn/AJMYfr9V6Pbv9QmlhGFgkPP9pcWkDiQNK0nRePOK57i57iZqSSZJzk5rn5fJLMdfFxebq2tMixHnBGzaWQN5tc6E5pGLiuJ+UW6faUTHu/yoPOAXn/27nvN4aAOVeqE/KBfjB531SmYrcz6H8IHYk8fT6hCAcbdcW5XE+vZG6Lel/qqeARBH0Uhuvf8Aa1ox7z3E9oB+G7Be/ee0y0OP+BAgNOcGaZCMl6l2Evj+y4pw3sxGEbzTvNNDBFrr6X7re8Y2oFrm7uKxoLo/tdWJbmMqHXNduPJ8xx68f9dAtUDa6cgtLgkvXT3Z9SyfOSsY8aEpWJia+WWY4sFalHVN275xWfOKzbGAA7emRFOBkH7Jj8aRbyUnGeRBFRbyibVyyY4+ZsgwfuM0DTIEXt2RbSZE24LIH0+6o6V6J3+o2xgwGYzgMwxoB/8AJ4PcBeH97/eLE2zFdBeMEEbjCYAAirmgkF0yZrC88Hot5eSeOR03QswgDWSmNIFlW8pvJsSCOmgsoMNqhKtXqimgSaRFuKHEY5xgAxqnglXJVn1Et2bdEmfwte6IFafVK3io3kFm82rRF+hQ/E5ot1QBHotCX8Ck4eI6atcRlRawFe6EyYrS8NoiYjndW0VumBoVgBGLQkA3KAJ8BQBHqtZMfAmspY2QkX86reQhLU7YmQ4QZkSeEfRAxjRXdM6k/wArXBzsqBrb1RtJU5z2j7IQDeD1K0DDP+M9/wBoH4jgYk9h/KNQA7/j/wDYoS0nl9k52IOJ5ftRgDp3TUZGZ/hRLmMx9PqqLZFWlNIEfMIPdK3Iq0xyj1BUkI4FNwHlj2vAgscHCpFjOVp+hQtxSM2nnQ9Fe+6p3acypPqXsP2+zamOc1pa5phzSQb2I4GuWRT9oxV8w9je0/g4zcSD/tcLy03E9jlUBezPtJrxvNMg2IXbj649zGzFxVmdjLDibWkv2hdpHFvdjIv6pcl2Olu2la9Wubjr7bjAskdVzRiys7tqMRKQcVM5xrrrXngw6eqMMPAIC5E0rg7D3OKogZkqbim6oIHDiVRJyEKOKS58qRpcBczwn8KYmNGXRKY08kwMAQhYQmp7JrkGG5E4oQCVfxKgIHlIe+tEhtaZlXKThYsc08lBQPRbySUU0ViOBU3lnbiXlWMa3NGJolXvJJxRqoH0RiNlCQl76tpRYV7mYKHFJI+6PeUBCMJTTBoY1GRRGTkOlERag3NEYltNbnr+1UkTNRcZIuaqNFeqVvNNwUogQQ0xyH2RHD518poiDZu48Mv0rMQW4jQ2TIiB+5CDHbatYyTXwP7j6j6LDjbQ0DdbPShpauaeN34qa1n/ACI6ohh/8yl4O0tireGncIv6lp/tFtRwXbaxkG7AOWIe5QHDf/uJ6qhj1iBqqdjZWonasKx2YhH+V9f2qAxIrvdz+UeM8kUuo3FoAb5q2jDhysmMxEpo8Cs8uysbNDlC+iHfExN0GIY5lGIog80xhOitjYCuVLFoSrIQOKELDNU1ZwnAqCOWd7c1oBQFIAxyezEWaIKfhuRYRkqFyjylkypKa5ElkK8N0FKWjOJNCiLKaoWtQTxBFEvei6W1qonVWI3fVlyzmVBiKxNO8VBiaIcN4IjNQ0pCMSy5UShECqtplSXKm8o5qEqSsVgNx5zSDswyKepKUyvwCgGERktykKRDWjNUWhNLVRakUrd4oSxMIQlIWH6JuG+FFEtJiEXzj6LOXyZ8oooqI5jEZaooskKEqKKiW0ZqnuhWokIMMzdOcyqiiDgXsCANUUSFEo2qlFGKIVQrUUhYT8kyc1FEVRQoUOIZEqKLKLCpzVai0C0eHilRRSOeRFc/KoAooiKiLlHc1SikgcrB9VFFJRCuqpRSUCqcrUSAFCVFEwP/2Q==",
        "description": "Wadi Al-Hitan is a paleontological site in the Faiyum Governorate of Egypt, some 150 kilometres south-west of Cairo. It was designated a UNESCO World Heritage Site in July 2005 for its hundreds of fossils of some of the earliest forms of whale, the archaeoceti."
    },
    {
        "name": "Ras Shetan",
        "image": "data:image/jpeg;base64,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",
        "description": "Ras Shaitan is a piece of heaven on Egyptian land that you really should pay a visit to"
    },
    {
        "name": "CarpeDiem Orabi Campsite",
        "image": "data:image/jpeg;base64,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",
        "description": "A camp with a lot of trees!"
    }
];

function seedDB() {
    // remove all
    Campground.remove({}, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('removed!');
            campgrounds.forEach(camp => {
                Campground.create(camp, (err, res) => {
                    if (err) {
                        console.log(err);
                    } else {
                        Comment.create({
                            text: 'This place is AWESOME',
                            author: 'nassiem'
                        }, (err, comment) => {
                            if (err) {
                                console.log(err);
                            } else {
                                res.comments.push(comment);
                                res.save();
                                console.log('created new comment!');
                            }
                        });
                        console.log('added');
                    }
                });
            });
        }
    });
}

module.exports = seedDB;
