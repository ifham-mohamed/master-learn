<!-- Managed by export_warehouse_plan.py -->

# B10 — Build and run

Reserve all shipment lines together. Add a cancel action that releases a reservation once. Run two concurrent requests for the last unit.

Work in `projects/warehouse-dispatch/` for a shared feature. Use this task folder for isolated experiments. For design, review, and interview tasks, save the artifact in Notes or Results.

Record the working directory, tool version, command or scenario, and test input. Keep your own code and checks here or in the shared project.

## Check your work

One request succeeds and one conflicts. Partial failure rolls back and available stock never becomes negative.

[Practice brief](../notes/00-warehouse-practice.md) · [Results](../results/evidence.md)
