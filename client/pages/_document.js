import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />

      <meta charset="utf-8" />
      <meta content="width=device-width, initial-scale=1.0" name="viewport" />

      <title>Task Management</title>
      <meta content="" name="descriptison" />
      <meta content="" name="keywords" />

      {/* <!-- Favicons --> */}
      <link href="/assets/img/favicon.png" rel="icon" />
      <link href="/assets/img/apple-touch-icon.png" rel="apple-touch-icon" />

      {/* <!-- Google Fonts --> */}
      <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Roboto:300,300i,400,400i,500,500i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i" rel="stylesheet" />

      {/* <!-- Vendor CSS Files --> */}
      <link href="/assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" />
      <link href="/assets/vendor/icofont/icofont.min.css" rel="stylesheet" />
      <link href="/assets/vendor/boxicons/css/boxicons.min.css" rel="stylesheet" />
      <link href="/assets/vendor/animate.css/animate.min.css" rel="stylesheet" />
      <link href="/assets/vendor/venobox/venobox.css" rel="stylesheet" />
      <link href="/assets/vendor/owl.carousel/assets/owl.carousel.min.css" rel="stylesheet" />
      <link href="/assets/vendor/aos/aos.css" rel="stylesheet" />
      <link href="/assets/vendor/remixicon/remixicon.css" rel="stylesheet" />

      {/* <!-- Template Main CSS File --> */}
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous"></link>

      <body>
        <Main />
        <NextScript />
      </body>

      <a href="#" class="back-to-top"><i class="icofont-simple-up"></i></a>

      <script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js"
        integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
        crossorigin="anonymous"></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-Fy6S3B9q64WdZWQUiU+q4/2Lc9npb8tCaSX9FK7E8HnRr0Jz8D6OP9dO5Vg3Q9ct"
        crossorigin="anonymous"></script>

    </Html>
  );
}