# Functional specification

- Visitors can browse only published programs, filter by seven areas, submit an enquiry, and register as learners.
- Registration validates input, normalizes email, hashes passwords and records an audit event. Login uses Auth.js credentials and a signed, encrypted JWT cookie; role is re-read from PostgreSQL on protected requests.
- Learners can enrol once per published program, see their own enrolments and receive a clear duplicate response. This does not mean payment, admission approval or course delivery.
- Administrators provisioned by CLI can save programs as drafts, edit, publish or unpublish them, update enquiry statuses, and view the latest 50 enquiries, programs and audit events. Unpublishing removes public visibility but retains existing enrolments. Server actions enforce roles independent of navigation. Other roles cannot enrol or access admin.
- Writes and corresponding audit events are transactional. Loading, empty, failure and success feedback are included where applicable. See acceptance tests for verification and security for launch limitations.

- Administrators can create, order, edit and publish plain-text lessons. Enrolled learners can see only published lessons, mark them complete and return to recorded completion. Unpublishing a lesson hides it and preserves progress; unpublishing a program retains existing enrolments. The admin lesson list is refreshed explicitly after adding lessons. Payment and commercial entitlement rules are not implemented.
