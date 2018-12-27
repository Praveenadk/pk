LOAD CSV WITH HEADERS From "file:///snapshotcompanydata.csv" as row
MERGE (company:Companydetails {companynumber: row.CompanyNumber}) ON CREATE
SET company.name = row.CompanyName
MERGE (address:Address {postcode:(row.RegAddressPostCode)}) ON CREATE 
SET address.line1=row.RegAddressAddressLine1, address.line2=row.RegAddressAddressLine2,
address.posttown=row.RegAddressPostTown,
address.county=row.RegAddressCounty,address.country=row.RegAddressCountry
MERGE (company)-[:LOCATION]->(address)
MERGE (companyactivity:SICCode {siccode:row.SICCodeSicText1})
MERGE (company)-[:ACTIVITY]->(companyactivity)