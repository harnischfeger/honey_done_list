import React from "react";
import styled from "styled-components/native";
import {Text} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const TextSection = styled.View`
width: 100%; 
padding: 5px; 
flex:1; 
`;

const TitleText = styled.Text`
padding-top: 10px;
font-family: GelasioReg;
font-size: 36px; 
text-align: center; 
width:100%; 
`;

const TitleDetails = styled.Text`
font-family: GelasioReg;
font-size: 16px; 
text-align: center; 
width:100%; 
paddingLeft: 40px; 
paddingRight: 40px; 
`;

const TitleH2 = styled.Text`
paddingBottom: 10px; 
paddingTop: 10px; 
paddingLeft: 40px; 
paddingRight: 40px; 
font-family: GelasioReg;
font-size: 20px; 
text-align: center; 
width:100%; 
`;

const AboutText = styled.Text`
paddingLeft: 40px; 
paddingRight: 40px; 
font-family: GelasioReg;
font-size: 16px;
text-align: justify
`;

const TermsConditions = () => {
    return (
<>
<ScrollView>
<TextSection>
    <TitleText>TERMS AND CONDITIONS</TitleText>
    <TitleDetails>(Last updated August 16, 2023)</TitleDetails>
    <TitleH2>AGREEMENT TO LEGAL TERMS</TitleH2>
    <AboutText>
    These Legal Terms constitute a legally binding agreement made between you, whether 
    personally or on behalf of an entity ("you"), and the creator of Honey Done List, concerning your 
    access to and use of this app. You agree that by accessing this app, you have read, understood, and 
    agreed to be bound by all of these Legal Terms. IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, 
    THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THIS APP AND YOU MUST DISCONTINUE USE IMMEDIATELY.
    {'\n'}
    {'\n'}
    Supplemental terms and conditions or documents that may be posted on this app from time to time 
    are hereby expressly incorporated herein by reference. Honey Done list reserves the right, in our sole 
    discretion, to make changes or modifications to these Legal Terms from time to time. We will alert you 
    about any changes by updating the "Last updated" date of these Legal Terms, and you waive any right to 
    receive specific notice of each such change. It is your responsibility to periodically review these Legal 
    Terms to stay informed of updates. You will be subject to, and will be deemed to have been made aware of 
    and to have accepted, the changes in any revised Legal Terms by your continued use of this app after the 
    date such revised Legal Terms are posted.
</AboutText>
<TitleH2>OUR SERVICES</TitleH2>
    <AboutText>
    The information provided when using this app is not intended for distribution to or use by 
    any person or entity in any jurisdiction or country where such distribution or use would be contrary 
    to law or regulation or which would subject us to any registration requirement within such jurisdiction or 
    country. Accordingly, those persons who choose to access this app from other locations do so on their own
     initiative and are solely responsible for compliance with local laws, if and to the extent local laws are 
     applicable.

</AboutText>
<TitleH2>INTELLECTUAL PROPERTY RIGHTS</TitleH2>
<TitleDetails>Our intellectual property</TitleDetails>
    <AboutText>
    The creator of Honey Done List is the sole owner or the licensee of all intellectual property rights in our 
    Services, including all source code, databases, functionality, software, website designs, audio, video, text, 
    photographs, and graphics in this app (collectively, the "Content"), as well as the trademarks, service marks, 
    and logos contained therein (the "Marks"). Unless otherwise created to a third party in the About section.
    {'\n'}
    {'\n'}
    Our Content and Marks are protected by copyright and trademark laws (and various other intellectual property 
    rights and unfair competition laws) and treaties in the United States and around the world.
    {'\n'}
    {'\n'}
    The Content and Marks are provided in or through this app "AS IS" for your personal, non-commercial use or 
    internal business purpose only.
    <TitleDetails>Your use of our Services</TitleDetails>
    Subject to your compliance with these Legal Terms, we grant you a non-exclusive, non-transferable, 
    revocable license to:
    {'\n'}
    {'\n'}
    Access this app solely for your personal, non-commercial use or internal business purpose.
    {'\n'}
    {'\n'}
    Except as set out in this section or elsewhere in our Legal Terms, no part of this app and no Content or 
    Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, 
    translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose 
    whatsoever.
    {'\n'}
    {'\n'}
    We reserve all rights not expressly granted to you in and to this app, Content, and Marks.
    {'\n'}
    {'\n'}
    Any breach of these Intellectual Property Rights will constitute a material breach of our Legal Terms and 
    your right to use our Services will terminate immediately.

</AboutText>
<TitleH2>MOBILE APPLICATION LICENSE</TitleH2>
<TitleDetails>Use License</TitleDetails>
<AboutText>
    If you access this app via the App, then we grant you a revocable, non-exclusive, non-transferable, limited 
    right to install and use the App on wireless electronic devices owned or controlled by you, and to access and 
    use the App on such devices strictly in accordance with the terms and conditions of this mobile application 
    license contained in these Legal Terms. You shall not: (1) except as permitted by applicable law, decompile, 
    reverse engineer, disassemble, attempt to derive the source code of, or decrypt the App; (2) make any 
    modification, adaptation, improvement, enhancement, translation, or derivative work from the App; (3) violate 
    any applicable laws, rules, or regulations in connection with your access or use of the App; (4) remove, alter, 
    or obscure any proprietary notice (including any notice of copyright or trademark) posted by us or the licensors 
    of the App; (5) use the App for any revenue-generating endeavor, commercial enterprise, or other purpose for 
    which it is not designed or intended; (6) make the App available over a network or other environment permitting
     access or use by multiple devices or users at the same time; (7) use the App for creating a product, service, 
     or software that is, directly or indirectly, competitive with or in any way a substitute for the App; (8) use 
     the App to send automated queries to any website or to send any unsolicited commercial email; or (9) use any 
     proprietary information or any of our interfaces or our other intellectual property in the design, development,
     manufacture, licensing, or distribution of any applications, accessories, or devices for use with the App.
     </AboutText>
     <TitleDetails>Apple and Android Devices</TitleDetails>
    <AboutText>
     The following terms apply when you use the App obtained from either the Apple Store or Google Play (each an "App 
     Distributor") to access this app: (1) the license granted to you for our App is limited to a non-transferable license 
     to use the application on a device that utilizes the Apple iOS or Android operating systems, as applicable, and in 
     accordance with the usage rules set forth in the applicable App Distributor’s terms of service; (2) we are responsible 
     for providing any maintenance and support services with respect to the App as specified in the terms and conditions 
     of this mobile application license contained in these Legal Terms or as otherwise required under applicable law, 
     and you acknowledge that each App Distributor has no obligation whatsoever to furnish any maintenance and support 
     services with respect to the App; (3) in the event of any failure of the App to conform to any applicable warranty, 
     you may notify the applicable App Distributor, and the App Distributor, in accordance with its terms and policies, 
     may refund the purchase price, if any, paid for the App, and to the maximum extent permitted by applicable law, 
     the App Distributor will have no other warranty obligation whatsoever with respect to the App; (4) you represent 
     and warrant that (i) you are not located in a country that is subject to a US government embargo, or that has been 
     designated by the US government as a "terrorist supporting" country and (ii) you are not listed on any US government 
     list of prohibited or restricted parties; (5) you must comply with applicable third-party terms of agreement when 
     using the App, e.g., if you have a VoIP application, then you must not be in violation of their wireless data service
      agreement when using the App; and (6) you acknowledge and agree that the App Distributors are third-party beneficiaries
       of the terms and conditions in this mobile application license contained in these Legal Terms, and that each App 
       Distributor will have the right (and will be deemed to have accepted the right) to enforce the terms and conditions 
       in this mobile application license contained in these Legal Terms against you as a third-party beneficiary thereof.
</AboutText>
<TitleH2>ADVERTISERS</TitleH2>
<AboutText>
We allow advertisers to display their advertisements and other information in certain areas of this app, such as sidebar 
advertisements or banner advertisements. We simply provide the space to place such advertisements, and we have no other 
relationship with advertisers
</AboutText>
<TitleH2>SERVICES MANAGEMENT</TitleH2>
<AboutText>
We reserve the right, but not the obligation, to: (1) monitor this app for violations of these Legal Terms; (2) take 
appropriate legal action against anyone who, in our sole discretion, violates the law or these Legal Terms, including 
without limitation, reporting such user to law enforcement authorities; (3) in our sole discretion and without limitation, 
refuse, restrict access to, limit the availability of, or disable (to the extent technologically feasible) any of your 
Contributions or any portion thereof; (4) in our sole discretion and without limitation, notice, or liability, to remove 
from this app or otherwise disable all files and content that are excessive in size or are in any way burdensome to our 
systems; and (5) otherwise manage this app in a manner designed to protect our rights and property and to facilitate the 
proper functioning of this app.
</AboutText>
<TitleH2>PRIVACY POLICY</TitleH2>
<AboutText>
We care about data privacy and security. By using this app, you agree to be bound by our Privacy Policy posted on this
 app, which is incorporated into these Legal Terms. Please be advised this app is hosted in the United States. If you 
 access this app from any other region of the world with laws or other requirements governing personal data collection, 
 use, or disclosure that differ from applicable laws in the United States, then through your continued use of this app, 
 you are transferring your data to the United States, and you expressly consent to have your data transferred to and 
 processed in the United States.
</AboutText>
<TitleH2>MODIFICATIONS AND INTERRUPTIONS</TitleH2>
<AboutText>
We reserve the right to change, modify, or remove the contents of this app at any time or for any reason at our sole 
discretion without notice. However, we have no obligation to update any information on our Services. We will not be liable 
to you or any third party for any modification, price change, suspension, or discontinuance of this app.
{'\n'}
{'\n'}
We cannot guarantee this app will be available at all times. We may experience hardware, software, or other problems or 
need to perform maintenance related to this app, resulting in interruptions, delays, or errors. We reserve the right to 
change, revise, update, suspend, discontinue, or otherwise modify this app at any time or for any reason without notice 
to you. You agree that we have no liability whatsoever for any loss, damage, or inconvenience caused by your inability to 
access or use this app during any downtime or discontinuance of this app. Nothing in these Legal Terms will be construed to 
obligate us to maintain and support this app or to supply any corrections, updates, or releases in connection therewith.
</AboutText>
<TitleH2>DISPUTE RESOLUTION</TitleH2>
<TitleDetails>Informal Negotiations</TitleDetails>
<AboutText>
To expedite resolution and control the cost of any dispute, controversy, or claim related to these Legal Terms (each a 
"Dispute" and collectively, the "Disputes") brought by either you or us (individually, a "Party" and collectively, the 
"Parties"), the Parties agree to first attempt to negotiate any Dispute (except those Disputes expressly provided below) 
informally for at least thirty (30) days before initiating arbitration. Such informal negotiations commence upon written 
notice from one Party to the other Party.
</AboutText>
<TitleDetails>Binding Arbitration</TitleDetails>
<AboutText>
If the Parties are unable to resolve a Dispute through informal negotiations, the Dispute (except those Disputes expressly 
excluded below) will be finally and exclusively resolved by binding arbitration. YOU UNDERSTAND THAT WITHOUT THIS PROVISION, 
YOU WOULD HAVE THE RIGHT TO SUE IN COURT AND HAVE A JURY TRIAL. The arbitration shall be commenced and conducted under the 
Commercial Arbitration Rules of the American Arbitration Association ("AAA") and, where appropriate, the AAA's Supplementary 
Procedures for Consumer Related Disputes ("AAA Consumer Rules"), both of which are available at the American Arbitration 
Association (AAA) website. Your arbitration fees and your share of arbitrator compensation shall be governed by the AAA 
Consumer Rules and, where appropriate, limited by the AAA Consumer Rules. The arbitration may be conducted in person, through
the submission of documents, by phone, or online. The arbitrator will make a decision in writing, but need not provide a
statement of reasons unless requested by either Party. The arbitrator must follow applicable law, and any award may be 
challenged if the arbitrator fails to do so. Except where otherwise required by the applicable AAA rules or applicable 
law, the arbitration will take place in Cobb, Georgia. Except as otherwise provided herein, the Parties may litigate in 
court to compel arbitration, stay proceedings pending arbitration, or to confirm, modify, vacate, or enter judgment on 
the award entered by the arbitrator.
{'\n'}
{'\n'}
If for any reason, a Dispute proceeds in court rather than arbitration, the Dispute shall be commenced or prosecuted in 
the state and federal courts located in Cobb, Georgia, and the Parties hereby consent to, and waive all defenses of lack 
of personal jurisdiction, and forum non conveniens with respect to venue and jurisdiction in such state and federal courts.
Application of the United Nations Convention on Contracts for the International Sale of Goods and the Uniform Computer 
Information Transaction Act (UCITA) are excluded from these Legal Terms.
{'\n'}
{'\n'}
In no event shall any Dispute brought by either Party related in any way to this app be commenced more than one (1) years 
after the cause of action arose. If this provision is found to be illegal or unenforceable, then neither Party will elect 
to arbitrate any Dispute falling within that portion of this provision found to be illegal or unenforceable and such Dispute 
shall be decided by a court of competent jurisdiction within the courts listed for jurisdiction above, and the Parties agree 
to submit to the personal jurisdiction of that court.
</AboutText>
<TitleDetails>Restrictions</TitleDetails>
<AboutText>
The Parties agree that any arbitration shall be limited to the Dispute between the Parties individually. To the full extent 
permitted by law, (a) no arbitration shall be joined with any other proceeding; (b) there is no right or authority for any 
Dispute to be arbitrated on a class-action basis or to utilize class action procedures; and (c) there is no right or 
authority for any Dispute to be brought in a purported representative capacity on behalf of the general public or any other 
persons.
</AboutText>
<TitleDetails>Exceptions to Informal Negotiations and Arbitration</TitleDetails>
<AboutText>
The Parties agree that the following Disputes are not subject to the above provisions concerning informal 
negotiations binding arbitration: (a) any Disputes seeking to enforce or protect, or concerning the validity of, 
any of the intellectual property rights of a Party; (b) any Dispute related to, or arising from, allegations of theft, 
piracy, invasion of privacy, or unauthorized use; and (c) any claim for injunctive relief. If this provision is found to 
be illegal or unenforceable, then neither Party will elect to arbitrate any Dispute falling within that portion of this 
provision found to be illegal or unenforceable and such Dispute shall be decided by a court of competent jurisdiction 
within the courts listed for jurisdiction above, and the Parties agree to submit to the personal jurisdiction of that court.
</AboutText>
<TitleH2>CORRECTIONS</TitleH2>
<AboutText>
There may be information on this app that contains typographical errors, inaccuracies, or omissions, including descriptions, 
pricing, availability, and various other information. We reserve the right to correct any errors, inaccuracies, or omissions 
and to change or update the information on this app at any time, without prior notice.
</AboutText>
<TitleH2>DISCLAIMER</TitleH2>
<AboutText>
THIS APP IS PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THIS APP WILL BE AT YOUR SOLE RISK.
 TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH this app AND 
 YOUR USE THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR 
 PURPOSE, AND NON-INFRINGEMENT. WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY OR COMPLETENESS OF this app' 
 CONTENT OR THE CONTENT OF ANY WEBSITES OR MOBILE APPLICATIONS LINKED TO this app AND WE WILL ASSUME NO LIABILITY OR 
 RESPONSIBILITY FOR ANY (1) ERRORS, MISTAKES, OR INACCURACIES OF CONTENT AND MATERIALS, (2) PERSONAL INJURY OR PROPERTY 
 DAMAGE, OF ANY NATURE WHATSOEVER, RESULTING FROM YOUR ACCESS TO AND USE OF this app, (3) ANY UNAUTHORIZED ACCESS TO OR 
 USE OF OUR SECURE SERVERS AND/OR ANY AND ALL PERSONAL INFORMATION AND/OR FINANCIAL INFORMATION STORED THEREIN, (4) ANY 
 INTERRUPTION OR CESSATION OF TRANSMISSION TO OR FROM this app, (5) ANY BUGS, VIRUSES, TROJAN HORSES, OR THE LIKE WHICH 
 MAY BE TRANSMITTED TO OR THROUGH this app BY ANY THIRD PARTY, AND/OR (6) ANY ERRORS OR OMISSIONS IN ANY CONTENT AND 
 MATERIALS OR FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF ANY CONTENT POSTED, TRANSMITTED, OR 
 OTHERWISE MADE AVAILABLE VIA this app. WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR ANY PRODUCT OR 
 SERVICE ADVERTISED OR OFFERED BY A THIRD PARTY THROUGH this app, ANY HYPERLINKED WEBSITE, OR ANY WEBSITE OR MOBILE 
 APPLICATION FEATURED IN ANY BANNER OR OTHER ADVERTISING, AND WE WILL NOT BE A PARTY TO OR IN ANY WAY BE RESPONSIBLE FOR 
 MONITORING ANY TRANSACTION BETWEEN YOU AND ANY THIRD-PARTY PROVIDERS OF PRODUCTS OR SERVICES. AS WITH THE PURCHASE OF A 
 PRODUCT OR SERVICE THROUGH ANY MEDIUM OR IN ANY ENVIRONMENT, YOU SHOULD USE YOUR BEST JUDGMENT AND EXERCISE CAUTION WHERE 
 APPROPRIATE.
</AboutText>
<TitleH2>LIMITATIONS OF LIABILITY</TitleH2>
<AboutText>
IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, 
CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR 
OTHER DAMAGES ARISING FROM YOUR USE OF this app, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. 
NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, OUR LIABILITY TO YOU FOR ANY CAUSE WHATSOEVER AND REGARDLESS OF 
THE FORM OF THE ACTION, WILL AT ALL TIMES BE LIMITED TO THE AMOUNT PAID, IF ANY, BY YOU TO US DURING THE ONE (1) MONTH PERIOD
PRIOR TO ANY CAUSE OF ACTION ARISING. CERTAIN US STATE LAWS AND INTERNATIONAL LAWS DO NOT ALLOW LIMITATIONS ON IMPLIED 
WARRANTIES OR THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES. IF THESE LAWS APPLY TO YOU, SOME OR ALL OF THE ABOVE 
DISCLAIMERS OR LIMITATIONS MAY NOT APPLY TO YOU, AND YOU MAY HAVE ADDITIONAL RIGHTS.
</AboutText>
<TitleH2>INDEMNIFICATION</TitleH2>
<AboutText>
You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective 
officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or demand, including 
reasonable attorneys’ fees and expenses, made by any third party due to or arising out of: (1) use of this app; (2) breach 
of these Legal Terms; (3) any breach of your representations and warranties set forth in these Legal Terms; (4) your 
violation of the rights of a third party, including but not limited to intellectual property rights; or (5) any overt 
harmful act toward any other user of this app with whom you connected via this app. Notwithstanding the foregoing, we 
reserve the right, at your expense, to assume the exclusive defense and control of any matter for which you are required to 
indemnify us, and you agree to cooperate, at your expense, with our defense of such claims. We will use reasonable efforts 
to notify you of any such claim, action, or proceeding which is subject to this indemnification upon becoming aware of it.
</AboutText>
<TitleH2>USER DATA</TitleH2>
<AboutText>
All data is stored locally on your the device this app is operating on.  We do not collect any personal data from your device.  
You are solely responsible for all data that you transmit or that relates to any activity you have undertaken using this app.
You agree that we shall have no liability to you for any loss or corruption of any such data, and you hereby waive any right
of action against us arising from any such loss or corruption of such data.
</AboutText>
<TitleH2>ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES</TitleH2>
<AboutText>
Visiting this app, sending us emails, and completing online forms constitute electronic communications. You consent to 
receive electronic communications, and you agree that all agreements, notices, disclosures, and other communications we 
provide to you electronically, via email and on this app, satisfy any legal requirement that such communication be in 
writing. YOU HEREBY AGREE TO THE USE OF ELECTRONIC SIGNATURES, CONTRACTS, ORDERS, AND OTHER RECORDS, AND TO ELECTRONIC 
DELIVERY OF NOTICES, POLICIES, AND RECORDS OF TRANSACTIONS INITIATED OR COMPLETED BY US OR VIA this app. You hereby waive 
any rights or requirements under any statutes, regulations, rules, ordinances, or other laws in any jurisdiction which 
require an original signature or delivery or retention of non-electronic records, or to payments or the granting of credits 
by any means other than electronic means.
</AboutText>
<TitleH2>CALIFORNIA USERS AND RESIDENTS</TitleH2>
<AboutText>
If any complaint with us is not satisfactorily resolved, you can contact the Complaint Assistance Unit of the Division of Consumer 
Services of the California Department of Consumer Affairs in writing at 1625 North Market Blvd., Suite N 112, Sacramento, 
California 95834 or by telephone at (800) 952-5210 or (916) 445-1254.
</AboutText>
<TitleH2>MISCELLANEOUS</TitleH2>
<AboutText>
These Legal Terms and any policies or operating rules posted by us on this app or in respect to this app constitute the 
entire agreement and understanding between you and us. Our failure to exercise or enforce any right or provision of these 
Legal Terms shall not operate as a waiver of such right or provision. These Legal Terms operate to the fullest extent 
permissible by law. We may assign any or all of our rights and obligations to others at any time. We shall not be responsible
 or liable for any loss, damage, delay, or failure to act caused by any cause beyond our reasonable control. If any 
 provision or part of a provision of these Legal Terms is determined to be unlawful, void, or unenforceable, that 
 provision or part of the provision is deemed severable from these Legal Terms and does not affect the validity and 
 enforceability of any remaining provisions. There is no joint venture, partnership, employment or agency relationship 
 created between you and us as a result of these Legal Terms or use of this app. You agree that these Legal Terms will 
 not be construed against us by virtue of having drafted them. You hereby waive any and all defenses you may have based 
 on the electronic form of these Legal Terms and the lack of signing by the parties hereto to execute these Legal Terms.
</AboutText>
</TextSection>
</ScrollView>
</>
    );
}
export default TermsConditions