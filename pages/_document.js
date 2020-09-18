import Document ,{Html,Head,Main,NextScript} from 'next/document';

export default class CustomDocument extends Document{

   
    render(){
        console.log("document");
        return(
        <Html>
                    
            <Head>
                <link href="https://stackpath.bootstrapcdn.com/bootswatch/4.5.0/lumen/bootstrap.min.css" rel='stylesheet'/>
                <link href="http://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet"/>
                <link href="https://fonts.googleapis.com/css2?family=Oswald&family=Mukta:wght@300;600&display=swap" rel="stylesheet"/>
            </Head>

            <body>
                <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDaxCWcYggJHAAIvAsUjXUrZTKO5RgPEbA&libraries=places"></script>
                <Main/>
            </body>
            <NextScript/>
        </Html>
            
        )
    }
}