# Sitemap

- `/`: introduction, seven product areas, enquiry form
- `/programs?area=...`: published catalogue and enrolment
- `/register`, `/login`: learner identity
- `/portal`: authenticated user's enrolments
- `/portal/programs/[id]`: enrolled learner's published lessons
- `/portal/lessons/[id]`: authorized lesson and completion
- `/admin`: admin drafts/publication, recent enquiries and status updates, and audit events
- `/admin/programs/[id]`: admin program editing, visibility and lesson creation
- `/admin/programs/[id]/lessons/[lessonId]`: admin lesson editing and visibility
- `/api/auth/*`: Auth.js; `/api/health`: database readiness

Instructor, mentor and employer-specific screens and payment screens are not implemented. Lesson pages support plain-text content; no actual curricula are supplied.
