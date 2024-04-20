-- CreateTable
CREATE TABLE "Views" (
    "route" VARCHAR(512) NOT NULL,
    "count" BIGINT NOT NULL DEFAULT 1,

    CONSTRAINT "Views_pkey" PRIMARY KEY ("route")
);
