# Insurance Kata

## Getting Started

The project assumes Node.js v24.22.1 and npm 11.19.1 are installed.

The server uses port `3000` by default. If that port is already in use, update
the port in `.env`.

From the project root, install the dependencies and start the development
server:

```sh
npm install
npm run dev
```

Run the tests with:

```sh
npm test
```

## Thought Process

These are high-level thoughts and assumptions after reading the basic insurance
kata problem. They may change as the business requirements become clearer.

### Decisions

#### Architecture

- Keep the implementation focused on a minimal API endpoint using Express.
- Use Supertest and Vitest for testing, given their ease of setup.
- Start with an individual, real-time submission and provide feedback to the
  consumer. Use `POST`, with `200` for success and appropriate `400` responses
  for invalid requests.
- Build a thin slice first, then expand input and business validation over
  time.
- Use the default Prettier formatting.

#### General Validation

- Use the common `yyyy-mm-dd` format for dates.
- Do not cascade business validations initially. Their order can be based on
  business requirements or processing needs.
- Check whether the policy is active and whether the incident is covered.

#### Business Rules

- Assume the policy ID is a string with a maximum length of six characters,
  based on the test data. In a real system, its validity would likely be crosschecked against some sort of typestore
- Start with case-sensitive incident type matching; consider normalization
  later if more flexibility is needed.
- Include both the policy start date and end date when checking coverage.
- Treat a payout of zero as `Approved` until the business rule is clarified.

### Open Questions and Future Considerations

Clarify the business use cases, compliance expectations, and security needs.
Some questions to explore:

- Who can access or submit claims? Is access controlled at the policy level?
  How will the API be hosted, and will it be behind an API management layer?
- Are duplicate requests allowed? Are there limits on claims per policy or
  within a period of time?
- What request volume is expected?
- What additional validation is needed, including checking whether a policy ID
  is valid? Should validation errors have more meaningful messages?
- Can validations be grouped, and should any of them cascade?
- What are the auditing requirements?
- Is the use case a single real-time request, multiple real-time requests, a
  scheduled batch, or some combination?
- If batch processing is needed, how is data provided, and should processing
  continue when an individual claim fails?
- Can tests be made more reusable?

### Initial Implementation Approach

1. Create the basic endpoints.
2. Define the request structure.
3. Define the response structure.
4. Add basic computations.
5. Improve validation.

### Reflection

The kata examples were in TypeScript, so I chose to use it even though most of
my experience is building C#/.NET backend applications. I underestimated what
I could accomplish in about 90 minutes. I spent a lot of time thinking through
the approach and probably did not need to go so far down the rabbit hole. I
also tried to avoid AI entirely, but used some as the work progressed.
