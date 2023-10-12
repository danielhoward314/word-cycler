package definition

import (
	"encoding/json"
	"io"
	"net/http"
	"net/url"
	"os"
	"time"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

const (
	baseURL        = `https://www.dictionaryapi.com/api/v3/references/`
	definitionPath = `collegiate/json/`
)

type MWResponse []*MWItem

type MWItem struct {
	Fl       string     `json:"fl"`
	Et       [][]string `json:"et,omitempty"`
	Shortdef []string   `json:"shortdef"`
}

type DefinitionResponse []*DefinitionItem

type DefinitionItem struct {
	Word         string   `json:"word"`
	PartOfSpeech string   `json:"part_of_speech"`
	Etymology    string   `json:"etymology"`
	Definitions  []string `json:"definitions"`
}

func convertMWResponse(word string, mwResponse MWResponse) DefinitionResponse {
	var dr DefinitionResponse
	for _, mwItem := range mwResponse {
		dItem := &DefinitionItem{
			Word:         word,
			PartOfSpeech: mwItem.Fl,
			Definitions:  mwItem.Shortdef,
		}
		if len(mwItem.Et) > 0 {
			et := mwItem.Et[0]
			if len(et) == 2 {
				dItem.Etymology = et[1]
			}
		}
		dr = append(dr, dItem)
	}
	return dr
}

func getDefinitionRequestURL(word string, dictionaryKey string) string {
	return baseURL + definitionPath + word + "?key=" + dictionaryKey
}

func handler(request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	dictionaryKey := os.Getenv("DICTIONARY_API_KEY")

	rawWordParam, found := request.QueryStringParameters["word"]
	if !found {
		return &events.APIGatewayProxyResponse{
			StatusCode: 404,
		}, nil
	}

	word, err := url.QueryUnescape(rawWordParam)
	if err != nil {
		return &events.APIGatewayProxyResponse{
			StatusCode: 500,
		}, nil
	}

	requestURL := getDefinitionRequestURL(word, dictionaryKey)
	req, err := http.NewRequest(http.MethodGet, requestURL, nil)
	if err != nil {
		return &events.APIGatewayProxyResponse{
			StatusCode: 500,
		}, nil
	}
	req.Header.Set("Content-Type", "application/json")
	client := &http.Client{
		Timeout: 30 * time.Second,
	}
	res, err := client.Do(req)
	if err != nil {
		return &events.APIGatewayProxyResponse{
			StatusCode: 500,
		}, nil
	}
	defer res.Body.Close()
	body, err := io.ReadAll(res.Body)
	if err != nil {
		return &events.APIGatewayProxyResponse{
			StatusCode: 500,
		}, nil
	}

	var mwResponse MWResponse
	err = json.Unmarshal(body, &mwResponse)
	if err != nil {
		return &events.APIGatewayProxyResponse{
			StatusCode: 500,
		}, nil
	}

	defResponse := convertMWResponse(word, mwResponse)
	finalBody, err := json.Marshal(defResponse)
	if err != nil {
		return &events.APIGatewayProxyResponse{
			StatusCode: 500,
		}, nil
	}

	return &events.APIGatewayProxyResponse{
		StatusCode: 200,
		Body:       string(finalBody),
	}, nil
}

func main() {
	lambda.Start(handler)
}
