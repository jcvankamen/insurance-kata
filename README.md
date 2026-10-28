# insurance-kata

## Getting Started

Assumes following versions are installed on machine
Node.js v24.22.1
Npm 11.19.1

Default port is 3000; if port is already in use change .env to target any other open port

run following commands in terminal at folder root

`npm install`
`npm run dev`

To run tests

`npm run test`

# THOUGHT PROCESS

Included below are high level thought processes that I had after reading the basic insurance kata problem

## Decisions

### Architectural

- Implementation will revolve around minimal API endpoint using Express
- Testing will utilize supertest and vitest given ease of setup
- The app will focus on individual real-time submission and feedback for the consumer using POST w/ 200 success, applicable 400s etc (see below).
- Input and business validation will progress over time in order to get a generic thin slice working
- Formatting will be applied by default Prettier settings

### Generic Validations

- Dates should use common format of yyyy-mm-dd
- Business Validation will not cascade, order in theory would be defined based on either business requirements or necessary processing
- Is policy active
- Is incident covered

### Business Rules

- Policy Id will be assumed a string max of 6 based on test data; in a true build this would be looked up through a system to make sure valid
- Incident type matching will be case sensitive on first iterations, later impelment santization for flexibility
- Processing of claim should be inclusive of the policy start and end dates.
- If the calculated payout is zero, it is considered 'Approved' vs 'Rejected' until there clarification is available

### Additional Considerations & Future Implementations

Gain clarification on the business use cases, compliance, security needs, etc

- figure out auth/security needs around who can access and who can execute, is there policy level access considerations, how is api hosted/is it behind apim etc
- idempotency, are exact duplicate requests allowable, max claims per policy in a certain amount of time, etc?
- what is expected load
- bulk up general validation - add more zod refinements that cover edge cases for input, check mock for validation of PolicyId being real, etc
- make tests reusable with loops
- determine if validations can expand into meaningful groups; if so then cascade
- determine auditing needs
- is real-time single request even a use case
- is real-time multiple request as a use case
- is timed batch process as a use case
- if timed batch process are there multiple publishers or how is the data consumed it a flat file etc
- batch processing do you continue on when there is a failure

### Initial Implementation Points

1. boiler plate endpoints
2. request structure
3. response structure
4. basic computations
5. enhanced validations

### Reflections

Placeholder for reflections
