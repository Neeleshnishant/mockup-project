import React from 'react'
import { Card } from 'reactstrap'
import { CrmSettingsTabPages } from '../Constants/CrmSettingsConstants';
import { EmailTemplates } from '../TabPages/EmailTemplates';
import { SmsTemplates } from '../TabPages/SmsTemplates';
import { Sequences } from '../TabPages/Sequences';
import { Statuses } from '../TabPages/Statuses';


export default function CrmTabContent({ activeTab }) {

    const TabOutlet = () => {
        switch (activeTab) {
            case CrmSettingsTabPages.Communication.EmailTemplates:
                return <EmailTemplates />
            case CrmSettingsTabPages.Communication.SmsTemplates:
                return <SmsTemplates />
            case CrmSettingsTabPages.Communication.EmailAndSmsSequence:
                return <Sequences />

            case CrmSettingsTabPages.Customisation.Statuses:
                return <Statuses />

            case CrmSettingsTabPages.Communication.EmailTemplates:
            default:
                return <EmailTemplates />
        }
    }

    return (
        //Fragment just in case
        <TabOutlet />
    )
}
