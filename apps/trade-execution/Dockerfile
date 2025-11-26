# Stage 1: Build the Go binary
FROM golang:latest-alpine AS builder
WORKDIR /app
COPY . .
# Initialize module if it doesn't exist (prevents build error)
RUN go mod init trade-execution || true
RUN go build -o main .

# Stage 2: Run the binary in a tiny container
FROM alpine:latest
WORKDIR /root/
COPY --from=builder /app/main .
EXPOSE 8080
CMD ["./main"]