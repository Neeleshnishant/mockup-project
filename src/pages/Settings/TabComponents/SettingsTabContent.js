import React from 'react'
import { Card } from 'reactstrap'
import { SettingsTabPages } from '../Constants/SettingsConstants';
import { OrganizationSetting } from '../TabPages/OrganizationSetting';
import { Companies } from '../TabPages/Companies';
import { ServiceCities } from '../TabPages/ServiceCities';
import { ListTypeOptions } from '../TabPages/ListTypeOptions';
import { ProfileSetting } from '../TabPages/ProfileSetting';
import { PaymentCredentials } from '../TabPages/PaymentCredentials';
import { BuySMSCredits } from '../TabPages/BuySMSCredits';
import { ConnectStripe } from '../TabPages/ConnectStripe';
import { ConnectQuickFee } from '../TabPages/ConnectQuickFee';
import { ConnectXero } from '../TabPages/ConnectXero';
import { ConnectMYOB } from '../TabPages/ConnectMYOB';
import { ConfigureEmail } from '../TabPages/ConfigureEmail';
import { ConnectCoverfright } from '../TabPages/ConnectCoverfright';
import { PagePersonalisation } from '../TabPages/PagePersonalisation';


export default function SettingsTabContent({ activeTab }) {

    const TabOutlet = () => {
        switch (activeTab) {
            case SettingsTabPages.OrganisationSetting:
                return <OrganizationSetting />
            case SettingsTabPages.Companies:
                return <Companies />
            case SettingsTabPages.ServiceCities:
                return <ServiceCities />
            case SettingsTabPages.ListTypeAndOptions:
                return <ListTypeOptions />
            case SettingsTabPages.ProfileSetting:
                return <ProfileSetting />
            case SettingsTabPages.PaymentCredentials:
                return <PaymentCredentials />
            case SettingsTabPages.BuySmsCredits:
                return <BuySMSCredits />
            case SettingsTabPages.ConnectStripe:
                return <ConnectStripe />
            case SettingsTabPages.ConnectQuickFee:
                return <ConnectQuickFee />
            case SettingsTabPages.ConnectXero:
                return <ConnectXero />
            case SettingsTabPages.ConnectMyob:
                return <ConnectMYOB />
            case SettingsTabPages.ConfigureEmail:
                return <ConfigureEmail />
            case SettingsTabPages.ConnectCoverfright:
                return <ConnectCoverfright />
            case SettingsTabPages.PagePersonalisation:
                return <PagePersonalisation />
            case SettingsTabPages.OrganisationSetting:
            default:
                return <OrganizationSetting />
        }
    }

    return (
        //Fragment just in case
        <>
            {TabOutlet()}
        </>

    )
}
