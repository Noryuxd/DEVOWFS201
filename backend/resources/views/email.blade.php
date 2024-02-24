<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800;900&display=swap');

        .email-container {
            background-color: #218cb32b;
            width: 100%;
            padding: 5px;
        }

        .email-wrraper {
            width: 50%;
            margin: 0 auto;
            padding: 10px 5px;
            font-family: 'Poppins', sans-serif;
            background-color: white;
            border-radius: 5px;
        }
        h1 {
            font-size: 15px;
            margin-left: 10px;
            color: black;
        }

        .email-body h3 {
            background-color: #218cb32b;
            width: fit-content;
            margin: 40px auto;
            padding: 10px 15px;
            border-radius: 5px;
            font-size: 25px;
            font-weight: 600
        }

        footer p {
            font-size: 10px
        }
    </style>
    <title>Document</title>
</head>

<body>
    <div class="email-container">
        <div class="email-wrraper">
            <h1>Verifier votre address e-mail</h3>
                <div class="email-body">
                    <h3>{{ $code }}</h3>
                </div>
                <footer>
                    <p>© 2004–2023 YSSER&IMANE International Ltd.</p>
                </footer>

        </div>
    </div>


</body>

</html>
