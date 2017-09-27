//차트에 명시될 부분의 이름을 지정, 색설정

var data = {
    labels: [
        "RAW_1", "RAW_2", "META_1", "META_2"
    ],
    datasets: [
        {
            label: 'Data_Comparison',
            data: [
                0, 0, 0, 0
            ],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                
            ],
            borderWidth: 1
        }
    ]
};

/*차트의 기본적인 틀을 생성
responsive 가 false 되어있지 않다면 html파일에서 설정한 canvas와 상관없이 사이즈가 매우 커지게 됨*/
var options = {
    animation: {
        animateScale: true
    },
    responsive: false,
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true
                }
            }
        ]
    }
};

//차트의 타입을 정하고 canvas 선택한다 

var ctx = document.getElementById("myChart").getContext('2d');
var myBarChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: options
});

//butoon의 기능을 활성화 한다.

var button = document.getElementById("sendAjax")

button.addEventListener("click", function() {
    sendAjax('http://localhost:3000/');
})

function sendAjax(url) {
    var oReq = new XMLHttpRequest();

    oReq.open('POST', url);
    oReq.setRequestHeader('Content-Type', "application/json") // json 형태로 보낸다
    oReq.send();

    oReq.addEventListener('load', function() {
        var result = JSON.parse(oReq.responseText);
        var score = result.score;
        var comp_data = data.datasets[0].data;

        for (var i = 0; i < comp_data.length; i++) {
            comp_data[i] = score[i];
        }

        data.datasets[0].data = comp_data;
        myBarChart.update();
    })
}