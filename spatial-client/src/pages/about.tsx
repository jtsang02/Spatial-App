import { Link } from 'react-router-dom'

export const About: React.FC = () => {
    return (
        <div>
            <section className="hero bg-gray-00">
                <div className="container mx-auto">
                    <h1 className="text-5xl font-bold mt-8 mb-4">
                        <div>Spatial Separation Calculator</div>
                        <div>NBC 2015</div>
                    </h1>

                    <div className="main-body">
                        <h2 className="text-2xl font-bold mb-2">Concept</h2>
                        <div className="paragraph mb-4">
                            The concept of spatial separation is to ensure that buildings are distanced far apart enough so that fire is
                            unlikely to spread from one building to another. The National Building Code of Canada (NBC 2015),
                            Ontario Building Code (OBC 2017), Manitoba Building Code (MBC 2010), British Columbia Building Code (BCBC 2018), and Alberta
                            Building Code (ABC 2014) include tables from which
                            the percentage of <em>unprotected openings</em> that are permitted in a building or compartment are
                            calculated. Construction requirements for the <em>exposing building face</em> are prescribed based on the
                            permitted area of unprotected openings.
                        </div>

                        <h2 className="text-2xl font-bold mb-2">Code References</h2>
                        <div className="paragraph mb-4">
                            <h3 className="text-xl font-bold">Part 3</h3>
                            <p>
                                Subsection 3.2.3 prescribes percentage limits for <em>unprotected openings</em> for buildings classified under
                                Part 3 of the Building Code. Tables 3.2.3.1.B and 3.2.3.1.C provide values for unsprinklered Part 3 buildings, and Tables
                                3.2.3.1.D and 3.2.3.1.E provide values for sprinklered buildings.
                            </p>
                            <p>
                                Article 3.2.3.7 prescribes construction requirements for the <em><em>exposing building face</em></em> based
                                on the permitted <em>unprotected openings</em> calculated from the applicable table.
                            </p>
                        </div>

                        <h2 className="text-2xl font-bold mb-2">Calculations</h2>
                        <div className="paragraph mb-4">
                            Area of <em>unprotected openings</em> permitted is based on two factors:
                            
                            <div className="mt-2 mb-2">
                                <p>1. Area of the <em><em>exposing building face</em></em> of the fire compartment.</p>
                                <p>2. Limiting distance measured to the property line, designated imaginary line, or centerline of a street.</p>
                            </div>
                            
                            <p>
                                Where the limiting distance or <em><em>exposing building face</em></em> area is between values on the
                                respective table, the calculator will interpolate between the values. Simply enter the width, height, and limiting distance of the
                                fire compartment and the calculator will output the permitted <em>unprotected openings</em> and construction
                                requirements derived from Table 3.2.3.7.
                            </p>
                        </div>

                        <p className="note text-gray-600">*Italicized are Building Code defined terms. Refer to Section 1.4 of the Building Code.</p>
                    </div>

                    <p className="mt-4">
                        <Link to="/">
                            <button>
                                Back to Home
                            </button>
                        </Link>
                    </p>
                </div>
            </section>
        </div>
    );
};