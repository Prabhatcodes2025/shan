import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import usePageMeta from '../hooks/usePageMeta';
import { company } from '../data/siteContent';

const ndaCommitments = [
  'Client information is limited to authorized personnel directly involved in project delivery.',
  'Project data, business documents, training materials, intellectual property, and sensitive content are treated as strictly confidential.',
  'Administrative, technical, and organizational safeguards are used to prevent unauthorized access, disclosure, modification, or misuse.',
  'Confidential client information is not disclosed, distributed, sold, or shared with any third party unless required by law or authorized in writing.',
];

function NdaCompliancePage() {
  usePageMeta('NDA Compliance');

  return (
    <div className="page-frame nda-compliance-page space-y-10 sm:space-y-14">
      <PageHero
        eyebrow="NDA Compliance"
        title="Confidentiality standards for every project."
        description="Shan Globalization recognizes the importance of protecting confidential and proprietary information shared by clients, partners, and stakeholders."
        aside={
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.24em] text-forest-300">Available on request</p>
            <p className="text-2xl font-semibold leading-tight text-white">
              We can execute Non-Disclosure Agreements before project commencement.
            </p>
            <Link to="/contact-us" className="btn-primary">
              Request NDA Support
            </Link>
          </div>
        }
      />

      <section className="nda-compliance-panel">
        <div className="nda-compliance-copy">
          <p>
            At <strong>{company.name}</strong>, we are committed to maintaining strict
            confidentiality standards across all projects, including Translation, Transcription,
            Data Collection, Data Annotation, AI Training, Quality Analysis, and Search Engine
            Evaluation services.
          </p>
          <p>
            Upon request, Shan Globalization is willing to execute Non-Disclosure Agreements
            (NDAs) with clients before project commencement. All confidential information, project
            data, training materials, business documents, intellectual property, and sensitive
            content shared during project execution will be treated as strictly confidential.
          </p>
          <p>
            Access to client information is limited only to authorized personnel directly involved
            in project delivery. We implement appropriate administrative, technical, and
            organizational safeguards to prevent unauthorized access, disclosure, modification, or
            misuse of confidential information.
          </p>
          <p>
            Our operations are aligned with internationally recognized quality and information
            security practices, including ISO 9001 and ISO/IEC 27001 standards.
          </p>
          <p>
            Shan Globalization will not disclose, distribute, sell, or share confidential client
            information with any third party unless required by law or explicitly authorized by the
            client in writing.
          </p>
        </div>

        <div className="nda-commitment-list">
          {ndaCommitments.map((item) => (
            <div key={item} className="nda-commitment-item">
              <span aria-hidden="true" />
              <p>{item}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default NdaCompliancePage;
