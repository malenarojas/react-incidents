import React from 'react';
import { Code } from "@chakra-ui/react";

function MiComponente() {
  return (
    <div>
      <iframe
        title="Tableau Public Embed"
        srcDoc={`
          <html>
            <body>
            <div class='tableauPlaceholder' id='viz1688824003984' style='position: relative'><noscript><a href='#'><img alt='Mapa UAGRM ' src='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Q8&#47;Q8WY8TQBR&#47;1_rss.png' style='border: none' /></a></noscript><object class='tableauViz'  style='display:none;'><param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F' /> <param name='embed_code_version' value='3' /> <param name='path' value='shared&#47;Q8WY8TQBR' /> <param name='toolbar' value='yes' /><param name='static_image' value='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Q8&#47;Q8WY8TQBR&#47;1.png' /> <param name='animate_transition' value='yes' /><param name='display_static_image' value='yes' /><param name='display_spinner' value='yes' /><param name='display_overlay' value='yes' /><param name='display_count' value='yes' /><param name='language' value='es-ES' /><param name='filter' value='publish=yes' /></object></div>                <script type='text/javascript'>                    var divElement = document.getElementById('viz1688824003984');                    var vizElement = divElement.getElementsByTagName('object')[0];                    vizElement.style.width='100%';vizElement.style.height=(divElement.offsetWidth*0.75)+'px';                    var scriptElement = document.createElement('script');                    scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js';                    vizElement.parentNode.insertBefore(scriptElement, vizElement);                </script>
            </body>
          </html>
        `}
        width="100%"
        height="827"
      />
    </div>
  );
}

export default MiComponente;