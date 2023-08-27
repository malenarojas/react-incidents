import React from 'react';
import { Code } from '@chakra-ui/react';
import { PowerBIEmbed } from 'powerbi-client-react';

function DashboardBi() {
  return (
    <div>
      <PowerBIEmbed
        embedConfig={{
          type: 'report', // Supported types: report, dashboard, tile, visual, qna, paginated report and create
          id: '07577af9-ea26-44e2-9cc9-21e894935010',
          embedUrl:
            'https://app.powerbi.com/groups/me/reports/07577af9-ea26-44e2-9cc9-21e894935010/',
          accessToken: '<Access Token>',
          // tokenType: models?.TokenType.Embed || 0, // Use models.TokenType.Aad for SaaS embed
          tokenType: 0, // Use models.TokenType.Aad for SaaS embed
          settings: {
            panes: {
              filters: {
                expanded: false,
                visible: false,
              },
            },
            // background: models?.BackgroundType.Transparent || 0,
            background: 0,
          },
        }}
        eventHandlers={
          new Map([
            [
              'loaded',
              function () {
                console.log('Report loaded');
              },
            ],
            [
              'rendered',
              function () {
                console.log('Report rendered');
              },
            ],
            [
              'error',
              function (event) {
                console.log(event.detail);
              },
            ],
            ['visualClicked', () => console.log('visual clicked')],
            ['pageChanged', (event) => console.log(event)],
          ])
        }
        cssClassName={'reportClass'}
        getEmbeddedComponent={(embeddedReport) => {
          this.report = embeddedReport;
        }}
      />
    </div>
  );
}

export default DashboardBi;
